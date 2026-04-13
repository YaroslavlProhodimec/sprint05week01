"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const jwt_service_1 = require("../application/jwt-service");
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const email_service_1 = require("../common/email/email.service");
const commands_1 = require("../users/commands");
const queries_1 = require("../users/queries");
const commands_2 = require("../device-sessions/commands");
const queries_2 = require("../device-sessions/queries");
function toUserId(user) {
    return String(user._id);
}
let AuthService = class AuthService {
    commandBus;
    queryBus;
    emailService;
    constructor(commandBus, queryBus, emailService) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
        this.emailService = emailService;
    }
    async register(login, email, password) {
        const [existingByEmail, existingByLogin] = await Promise.all([
            this.queryBus.execute(new queries_1.FindUserByEmailQuery(email)),
            this.queryBus.execute(new queries_1.FindUserByLoginQuery(login)),
        ]);
        if (existingByLogin || existingByEmail) {
            const errorsMessages = [];
            if (existingByLogin)
                errorsMessages.push({ message: 'User with this login already exists', field: 'login' });
            if (existingByEmail)
                errorsMessages.push({ message: 'User with this email already exists', field: 'email' });
            throw new common_1.BadRequestException({ errorsMessages });
        }
        const confirmationCode = (0, uuid_1.v4)();
        const expirationDate = (0, date_fns_1.add)(new Date(), { hours: 3, minutes: 3 });
        const created = await this.commandBus.execute(new commands_1.CreateUserForRegistrationCommand(login, email, password, confirmationCode, expirationDate));
        try {
            await this.emailService.sendConfirmationEmail(email, confirmationCode);
        }
        catch (e) {
            await this.commandBus.execute(new commands_1.DeleteUserCommand(toUserId(created)));
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Registration failed', field: 'email' }] });
        }
    }
    async confirmCode(code) {
        const user = await this.queryBus.execute(new queries_1.FindUserByConfirmationCodeQuery(code));
        const emailConf = user?.emailConfirmation;
        if (!user || !emailConf || emailConf.confirmationCode !== code) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Incorrect confirmation code', field: 'code' }] });
        }
        if (emailConf.isConfirmed) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'User is already confirmed', field: 'code' }] });
        }
        if (emailConf.expirationDate && new Date(emailConf.expirationDate) < new Date()) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Confirmation code expired', field: 'code' }] });
        }
        const updated = await this.commandBus.execute(new commands_1.ConfirmUserCommand(toUserId(user)));
        if (!updated) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Update failed', field: 'code' }] });
        }
    }
    async resendEmail(email) {
        const user = await this.queryBus.execute(new queries_1.FindUserByEmailQuery(email));
        if (!user) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Wrong email', field: 'email' }] });
        }
        const isConfirmed = user.emailConfirmation?.isConfirmed ?? user.isConfirmed ?? false;
        if (isConfirmed) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Email already confirmed', field: 'email' }] });
        }
        const newCode = (0, uuid_1.v4)();
        const newExpirationDate = (0, date_fns_1.add)(new Date(), { hours: 3, minutes: 3 });
        await this.commandBus.execute(new commands_1.UpdateConfirmationCodeCommand(toUserId(user), newCode, newExpirationDate));
        await this.emailService.sendConfirmationEmail(user.accountData.email, newCode);
    }
    async login(loginOrEmail, password, ip, deviceName) {
        const user = await this.queryBus.execute(new queries_1.CheckCredentialsQuery(loginOrEmail, password));
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const userId = toUserId(user);
        const deviceId = (0, uuid_1.v4)();
        return this.generateTokensAndCreateSession(userId, deviceId, ip, deviceName);
    }
    async refreshTokens(oldRefreshToken) {
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
        const payload = await jwt_service_1.jwtService.getJwtPayloadResult(oldRefreshToken, refreshSecret);
        if (!payload || !payload.userId || !payload.deviceId) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const session = await this.queryBus.execute(new queries_2.FindSessionByDeviceIdQuery(payload.deviceId));
        if (!session) {
            throw new common_1.UnauthorizedException('Session not found');
        }
        const tokenIssuedAt = new Date((payload.iat ?? 0) * 1000);
        if (session.issuedAt.getTime() !== tokenIssuedAt.getTime()) {
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        return this.generateTokensAndUpdateSession(payload.userId, payload.deviceId);
    }
    async getMe(userId) {
        const user = await this.queryBus.execute(new queries_1.FindUserByIdQuery(userId));
        if (!user)
            return null;
        return {
            email: user.accountData.email,
            login: user.accountData.login,
            userId: toUserId(user),
        };
    }
    async passwordRecovery(email) {
        const user = await this.queryBus.execute(new queries_1.FindUserByEmailQuery(email));
        if (user) {
            const recoveryCode = (0, uuid_1.v4)();
            const expirationDate = (0, date_fns_1.add)(new Date(), { hours: 24 });
            await this.commandBus.execute(new commands_1.SetRecoveryCodeCommand(toUserId(user), recoveryCode, expirationDate));
            const link = `https://somesite.com/password-recovery?recoveryCode=${recoveryCode}`;
            await this.emailService.sendPasswordRecoveryEmail(email, link);
        }
    }
    async newPassword(recoveryCode, newPassword) {
        const user = await this.queryBus.execute(new queries_1.FindUserByRecoveryCodeQuery(recoveryCode));
        if (!user) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Recovery code is incorrect', field: 'recoveryCode' }] });
        }
        if (user.recoveryCodeExpiration && new Date(user.recoveryCodeExpiration) < new Date()) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Recovery code expired', field: 'recoveryCode' }] });
        }
        await this.commandBus.execute(new commands_1.SetNewPasswordCommand(toUserId(user), newPassword));
    }
    async logout(refreshToken) {
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
        const payload = await jwt_service_1.jwtService.getJwtPayloadResult(refreshToken, refreshSecret);
        if (!payload || !payload.userId || !payload.deviceId) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const session = await this.queryBus.execute(new queries_2.FindSessionByDeviceIdQuery(payload.deviceId));
        if (!session) {
            throw new common_1.UnauthorizedException('Session not found');
        }
        const tokenIssuedAt = new Date((payload.iat ?? 0) * 1000);
        if (session.issuedAt.getTime() !== tokenIssuedAt.getTime()) {
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        await this.commandBus.execute(new commands_2.DeleteDeviceSessionCommand(payload.deviceId));
    }
    async generateTokensAndCreateSession(userId, deviceId, ip, deviceName) {
        const accessSecret = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
        const [accessToken, refreshToken] = await Promise.all([
            jwt_service_1.jwtService.createJWT({ userId }, accessSecret, 10),
            jwt_service_1.jwtService.createJWT({ userId, deviceId }, refreshSecret, 20),
        ]);
        const refreshPayload = await jwt_service_1.jwtService.getJwtPayloadResult(refreshToken, refreshSecret);
        const issuedAt = new Date((refreshPayload.iat ?? 0) * 1000);
        const expirationDate = new Date((refreshPayload.exp ?? 0) * 1000);
        await this.commandBus.execute(new commands_2.CreateDeviceSessionCommand(userId, deviceId, issuedAt, expirationDate, ip, deviceName));
        return { accessToken, refreshToken };
    }
    async generateTokensAndUpdateSession(userId, deviceId) {
        const accessSecret = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
        const [accessToken, refreshToken] = await Promise.all([
            jwt_service_1.jwtService.createJWT({ userId }, accessSecret, 10),
            jwt_service_1.jwtService.createJWT({ userId, deviceId }, refreshSecret, 20),
        ]);
        const refreshPayload = await jwt_service_1.jwtService.getJwtPayloadResult(refreshToken, refreshSecret);
        const issuedAt = new Date((refreshPayload.iat ?? 0) * 1000);
        const expirationDate = new Date((refreshPayload.exp ?? 0) * 1000);
        await this.commandBus.execute(new commands_2.UpdateDeviceSessionCommand(deviceId, issuedAt, expirationDate));
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map