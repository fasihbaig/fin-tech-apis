import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';
import { JwtAuthService } from '../common/jwt-auth/jwt-auth.service';

@Module({
  imports: [ 
    DatabaseModule,
    CommonModule
   ],
  controllers: [AccountController],
  providers: [AccountService, JwtAuthService],
})
export class AccountModule {}
