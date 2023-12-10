import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { DatabaseModule } from '../database/database.module';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../account/services/account.service';


@Module({
  imports: [DatabaseModule, AccountModule],
  controllers: [TransactionController],
  providers: [TransactionService, AccountService],
})
export class TransactionModule {}
