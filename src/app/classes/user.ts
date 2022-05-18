export class User {
  userId: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  active: boolean;
  description: string;
  created: string;
  
  constructor(userId: string = '', name: string = '', email: string = '', password: string = '', avatar: string = '', role: string = '', active: boolean = false, description: string = '', created: string = '') {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.role = role;
    this.active = active;
    this.description = description;
    this.created = created;
  }
}
