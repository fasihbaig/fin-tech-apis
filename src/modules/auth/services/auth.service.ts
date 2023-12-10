import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/entities';
import { JwtAuthService } from '../../../modules/common/jwt-auth/jwt-auth.service';
import { TextHashManager } from '../../../modules/common/hash/text-hash-manager';
import { Op } from 'sequelize';
import { omit } from "lodash";

@Injectable()
export class AuthService {

  constructor( 
    private jwtAuthService: JwtAuthService,
    private textHashManager: TextHashManager,
    @InjectModel(User) private userModel: typeof User
  ) {}

  /**
   * 
   * @param { string } username 
   * @param { string } password 
   * @returns { Promise<{ user: Partial<User>, token: string}> }
   */
   public async login(username: string, password: string): Promise<{ user:  Partial<User>, token: string}> {
    const user = await this.getAuthUser(username);

    if(!user) {
      throw new BadRequestException("Invalid Email")
    }

    const isMatched = await this.textHashManager.compareHash(user.get("password"), password);

    if(!isMatched) {
      throw new BadRequestException("Invalid Credentials");
    }
   
    const token = await this.jwtAuthService.createNewToken({
        id: user.get("id"),
        username: user.get("username"),
        firstName: user.get("firstName"),
        lastName: user.get("lastName"),
        email: user.get("email")
    })

    return {
      user: omit(user, "password"),
      token
    }
   }

   /**
    * 
    * @param { string } username 
    * @returns { Promise<User | null> }
    */
   private getAuthUser(username: string): Promise<User | null> {
      return this.userModel.findOne({
        attributes: ["id", "email", "username", "firstName", "lastName", "password"],
        where: {
          [Op.or]: {
            email: { [Op.eq]: username },
            username: { [Op.eq]: username },
          }
        }
      })
   }
}
