export class User {
  userId: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  
  constructor(userId: string = '', name: string = '', email: string = '', password: string = '', avatar: string = '') {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
  }
}
