import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';
import { JwtAuthService } from '../common/jwt-auth/jwt-auth.service';
import { TextHashManager } from '../common/hash/text-hash-manager';

@Module({
  imports: [
    DatabaseModule,
    CommonModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtAuthService,
    TextHashManager
  ],
})
export class UserModule {}
