"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../../application/jwt-service");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
let RefreshTokenGuard = class RefreshTokenGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies?.refreshToken;
        if (!refreshToken) {
            throw new common_1.UnauthorizedException();
        }
        const payload = await jwt_service_1.jwtService.getJwtPayloadResult(refreshToken, REFRESH_TOKEN_SECRET);
        if (!payload?.userId || !payload?.deviceId) {
            throw new common_1.UnauthorizedException();
        }
        request.user = {
            userId: payload.userId,
            deviceId: payload.deviceId,
            iat: payload.iat,
        };
        return true;
    }
};
exports.RefreshTokenGuard = RefreshTokenGuard;
exports.RefreshTokenGuard = RefreshTokenGuard = __decorate([
    (0, common_1.Injectable)()
], RefreshTokenGuard);
//# sourceMappingURL=refresh-token.guard.js.map