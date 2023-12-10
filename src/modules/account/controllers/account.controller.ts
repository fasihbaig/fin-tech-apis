import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { JwtAuthGuard } from '../../../modules/common/jwt-guard/jwt-auth.guard';

@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createAccountHandler(createAccountDto);
  }


  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

}
