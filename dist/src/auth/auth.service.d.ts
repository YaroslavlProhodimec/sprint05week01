import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EmailService } from '../common/email/email.service';
export declare class AuthService {
    private commandBus;
    private queryBus;
    private emailService;
    constructor(commandBus: CommandBus, queryBus: QueryBus, emailService: EmailService);
    register(login: string, email: string, password: string): Promise<void>;
    confirmCode(code: string): Promise<void>;
    resendEmail(email: string): Promise<void>;
    login(loginOrEmail: string, password: string, ip: string, deviceName: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(oldRefreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: string): Promise<{
        email: string;
        login: string;
        userId: string;
    } | null>;
    passwordRecovery(email: string): Promise<void>;
    newPassword(recoveryCode: string, newPassword: string): Promise<void>;
    logout(refreshToken: string): Promise<void>;
    private generateTokensAndCreateSession;
    private generateTokensAndUpdateSession;
}
