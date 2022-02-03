import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Crypt {
  /**
   * Generate bcrypt hash from user password
   * @param  password - user password
   * @returns hash Promise<string>
   */
  async getPasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Check user password and bcrypt hash
   * @param  hash - bcrypt hash
   * @param  password - user password
   * @returns true if success Promise<boolean>
   */
  async checkPassword(hash: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
