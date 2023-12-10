import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from '../dto/create-account.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from '../../../modules/database/entities';
import { Op, Transaction as SequelizeTransaction } from 'sequelize';
import { TransactionType } from '../../../enums';
import { ModuleRef } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { TransactionService } from '../../../modules/transaction/services/transaction.service';

@Injectable()
export class AccountService {

  constructor(
    @InjectModel(Account) private accountModel: typeof Account,
    private moduleRef: ModuleRef
  ) {}

  /**
   * 
   * @param { CreateAccountDto } createAccountDto 
   * @returns { Partial<CreateAccountDto> }
   */
  createAccountHandler(createAccountDto: Partial<CreateAccountDto>) {
    if(!createAccountDto.balance) {
      createAccountDto.balance = 0;
    }
    const sequelize = this.moduleRef.get(Sequelize, {strict: false});
    const transactionService = this.moduleRef.get(TransactionService, {strict: false});
    return sequelize.transaction(async (transaction) => {
      const account = await this.accountModel.create(createAccountDto, { transaction });
      if(createAccountDto.balance && createAccountDto.balance > 0 ) {
        await transactionService.addTransaction(
          account.get("id"),
          createAccountDto.balance,
          TransactionType.CREDIT,
          transaction
        );
      }
      return account;
    });
  }

  /**
   * 
   * @param { number } id 
   * @returns { Promise<Account | null> }
   */
  findOne(id: number): Promise<Account | null> {
    return this.accountModel.findOne({
      where: {
        id: { [Op.eq]: id }
      }
    })
  }

  /**
   * 
   * @param { number } accountId 
   * @param { number } amount 
   * @param { TransactionType } transactionType 
   * @param { SequelizeTransaction } transaction 
   * @returns { Promise<[affectedRows: Account[], affectedCount?: number | undefined]> }
   */
  updateAccountBalance(
    accountId: number,
    amount: number,
    transactionType: TransactionType,
    transaction: SequelizeTransaction
  ): Promise<[affectedRows: Account[], affectedCount?: number | undefined]> {
    switch(transactionType) {
      case TransactionType.CREDIT:
        return this.accountModel.increment({
          balance: amount,
        }, { 
          where: { id: { [Op.eq]: accountId } },
          transaction
        });  

      case TransactionType.DEBIT:
        return this.accountModel.decrement({
          balance: amount,
        }, { 
          where: { id: { [Op.eq]: accountId} },
          transaction
        }); 

      default:
        throw new BadRequestException("Invalid transaction Type")
    }
  }

  /**
   * 
   * @param { number } accountId 
   * @param { number } userId
   * @returns { Promise<number>}
   */
  public async getUserIdAgainstAccountNumber(accountId: number, userId: number): Promise<Account> {
    const account = await this.accountModel.findOne({
      attributes: ["userId", "balance"],
      where: { 
        id: { [Op.eq]: accountId },
        userId: { [Op.eq]: userId }
      }
    });

    if(!account) {
      throw new BadRequestException("Invalid AccountID passed")
    }

    return account;
  }
}
