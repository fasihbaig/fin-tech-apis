import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/entities';
import { Op } from 'sequelize';
import { JwtAuthService } from '../../../modules/common/jwt-auth/jwt-auth.service';
import { TextHashManager } from '../../../modules/common/hash/text-hash-manager';

@Injectable()
export class UserService {

  constructor( 
    @InjectModel(User) private userModel: typeof User,
    private jwtAuthService: JwtAuthService,
    private textHashManager: TextHashManager
  ) {}

  /**
   * 
   * @param { Partial<CreateUserDto> } createUserDto 
   * @returns { Promise<{ user: User, token: string }> }
   */
  async createUserHandler(
    createUserDto: Partial<CreateUserDto>
  ): Promise<{
    user:User,
    token: string
  }> {
    const passwordHash = await this.textHashManager.createTextHash(createUserDto.password as string, 10);
    createUserDto.password = passwordHash;
    const user = await this.userModel.create(createUserDto);
    const token = await this.jwtAuthService.createNewToken({
        id: user.get("id"),
        username: user.get("username"),
        firstName: user.get("firstName"),
        lastName: user.get("lastName"),
        email: user.get("email")
    })
    return { user, token }
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
