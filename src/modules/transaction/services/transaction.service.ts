import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from '../../../modules/database/entities';
import { TransactionType } from '../../../enums';
import { AccountService } from '../../../modules/account/services/account.service';
import { Sequelize, Transaction as SequelizeTransaction } from 'sequelize';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class TransactionService {

  constructor(
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    private moduleRef: ModuleRef
  ){}

  /**
   * 
   * @param { Partial<CreateTransactionDto> } createTransactionDto 
   * @returns { Promise<Transaction> }
   */
  addTransactionHandler(createTransactionDto: Partial<CreateTransactionDto>, userId: number): Promise<Transaction> {
    const sequelize = this.moduleRef.get(Sequelize, {strict: false});
    const accountService = this.moduleRef.get(AccountService, {strict: false});
    return sequelize.transaction(async (transaction) => {
       const transactionAdded =  await this.addTransaction(
        createTransactionDto.accountId as number,
        createTransactionDto.amount as number,
        createTransactionDto.transactionType as TransactionType,
        transaction
       );
       accountService.updateAccountBalance(
        createTransactionDto.accountId as number,
        createTransactionDto.amount as number,
        createTransactionDto.transactionType as TransactionType,
        transaction
       );

       return transactionAdded
    })
  }

  /**
   * 
   * @param { number } accountId 
   * @param { number } amount 
   * @param { TransactionType } transactionType 
   * @param { SequelizeTransaction } transaction 
   * @returns { Promise<Transaction> } 
   */
  public addTransaction(
    accountId: number,
    amount: number,
    transactionType: TransactionType,
    transaction: SequelizeTransaction
  ): Promise<Transaction> {
    return this.transactionModel.create({
      accountId,
      amount,
      transactionType
    }, { transaction});
  }
}
