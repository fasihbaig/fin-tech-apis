import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { getModels } from './entities';

const models = getModels()

const databaseModule = SequelizeModule.forFeature(models);
@Module({
    imports: [
        databaseModule
    ],
    exports: [databaseModule]
})
export class DatabaseModule {}
