import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account, User } from './entities';

const models = [
    User, 
    Account
];

const databaseModule = SequelizeModule.forFeature(models);
@Module({
    imports: [
        databaseModule
    ],
    exports: [databaseModule]
})
export class DatabaseModule {}
