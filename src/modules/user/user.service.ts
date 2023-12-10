import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/entities';
import { Op } from 'sequelize';

@Injectable()
export class UserService {

  constructor( 
    @InjectModel(User) private userModel: typeof User
  ) {}

  /**
   * 
   * @param { Partial<CreateUserDto> } createUserDto 
   * @returns { Promise<User> }
   */
  create(
    createUserDto: Partial<CreateUserDto>
  ): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  /**
   * 
   * @returns { Promise<User[]> } 
   */
  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  /**
   * 
   * @param { number } id 
   * @returns { Promise<User | null> }
   */
  findOne(id: number): Promise<User | null> {
    return this.userModel.findOne({ 
      where: { id:{ [Op.eq]: id } }
    })
  }

  /**
   * 
   * @param { number } id 
   * @param { UpdateUserDto } updateUserDto 
   * @returns 
   */
  update(id: number, updateUserDto: UpdateUserDto): Promise<[number]> {
    return this.userModel.update(updateUserDto, {
      where: { id: { [Op.eq]: id } }
    })
  }

  /**
   * 
   * @param { number } id 
   * @returns { Promise<number> }
   */
  remove(id: number): Promise<number> {
    return this.userModel.destroy({
      where: { id: { [Op.eq]: id } }
    })
  }
}
