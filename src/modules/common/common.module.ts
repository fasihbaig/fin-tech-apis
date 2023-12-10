import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { TextHashManager } from './hash/text-hash-manager';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({ 
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: configService.get<string>("JWT_TOKEN_EXPIRY_TIME_SEC") },
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [
        JwtService, 
        JwtAuthService, 
        TextHashManager
    ],
    exports: [JwtAuthService, TextHashManager, JwtService]
})
export class CommonModule {}
