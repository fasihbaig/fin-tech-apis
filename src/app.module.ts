import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getModels } from './modules/database/entities';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';
import { CommonModule } from './modules/common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AccountModule,
    CommonModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    ConfigService
  ],
})
export class AppModule {}
