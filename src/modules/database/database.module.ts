import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities';

const models = [User]
const databaseModule = SequelizeModule.forFeature(models);
@Module({
    imports: [
        databaseModule
    ],
    exports: [databaseModule]
})
export class DatabaseModule {}
