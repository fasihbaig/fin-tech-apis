import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getModels } from './modules/database/entities';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get("DB_DIALECT"),
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        models: [...getModels()],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AccountModule,
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
