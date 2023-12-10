    
import { Injectable } from '@nestjs/common';
import { hash, compare,genSaltSync } from 'bcrypt';
import { promisify } from 'util';

@Injectable()
export class TextHashManager {

  /**
   * @param { string } text 
   * @param { string } saltRound 
   * @returns  { Promise<string> }
   */
  public async createTextHash(
    text: string, 
    saltRound: number
  ): Promise<string> {
    const hashPromise = promisify(hash); 
    const salt = genSaltSync(saltRound);
    return hashPromise(text, salt);
  }

  /**
   * 
   * @param { string } hash 
   * @param { string } text 
   * @returns { Promise<boolean> } 
   */
  public async compareHash(
    hash: string, 
    text: string
  ): Promise<boolean> {
     return compare(text, hash);
  }
}