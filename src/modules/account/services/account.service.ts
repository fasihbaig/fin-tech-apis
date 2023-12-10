import { Injectable, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from '../dto/create-account.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from 'src/modules/database/entities';
import { Op } from 'sequelize';
import { JwtAuthGuard } from '../../../modules/common/jwt-guard/jwt-auth.guard';

@Injectable()
export class AccountService {

  constructor(
    @InjectModel(Account) private accountModel: typeof Account,
  ) {}

  @UseGuards(JwtAuthGuard)
  create(createAccountDto: Partial<CreateAccountDto>) {
    if(!createAccountDto.balance) {
      createAccountDto.balance = 0;
    }
    return this.accountModel.create(createAccountDto)
  }

  @UseGuards(JwtAuthGuard)
  findOne(id: number) {
    return this.accountModel.findOne({
      where: {
        id: { [Op.eq]: id }
      }
    })
  }
}
