import * as uuid from 'uuid';
/** Class representing a user. */
export class User {
  public id: string;
  public name: string;
  public login: string;
  public password: string;
  /**
 * Creates an instance of user.
 * @param object -
 * id: string;
  name: string;
  login: string;
  password: string;
 */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
  /**
   * Get from user id,name,login string
   *
   * @param  user - user to destruct
   * @returns id (string), name (string), login (string)
   */
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
