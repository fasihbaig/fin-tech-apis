import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/modules/common/jwt-guard/jwt-auth.guard';
import { User } from 'src/modules/database/entities';
import { get } from 'lodash';


@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUserHandler(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(
    @Param('id') id: string,
    @Req() req: Request
    ) {
    if(get(req, "user.id") != id) {
      throw new UnauthorizedException("You cannot perform this operation for given user")
    }
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request
  ) {
    if(get(req, "user.id") != id) {
      throw new UnauthorizedException("You cannot perform this operation for given user")
    }
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  remove(
    @Param('id') id: string,
    @Req() req: Request
    ) {
    if(get(req, "user.id") != id) {
      throw new UnauthorizedException("You cannot perform this operation for given user")
    }
    return this.userService.remove(+id);
  }
}
