import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { getModels } from './entities';
import { ConfigService } from '@nestjs/config';

const models = getModels()

const sequelizeModule = SequelizeModule.forRootAsync({
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
  });

const databaseModule = SequelizeModule.forFeature(models);

@Module({
    imports: [
        sequelizeModule,
        databaseModule
    ],
    exports: [databaseModule ]
})
export class DatabaseModule {}
