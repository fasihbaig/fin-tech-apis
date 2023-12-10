import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { JwtAuthService } from '../common/jwt-auth/jwt-auth.service';
import { TextHashManager } from '../common/hash/text-hash-manager';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [
        CommonModule,
        DatabaseModule
    ],
    providers: [
        JwtAuthService,
        TextHashManager,
        AuthService,
        TextHashManager
    ],
    controllers: [ AuthController ]
})
export class AuthModule {}
