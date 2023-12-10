import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { JwtAuthGuard } from '../../../modules/common/jwt-guard/jwt-auth.guard';
import { get } from 'lodash';

@Controller('api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/")
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: Request
    ) {
     const userId = get(req, "user.id", "");
    return this.transactionService.addTransactionHandler(
      createTransactionDto, 
      parseInt(userId)
    );
  }

}
