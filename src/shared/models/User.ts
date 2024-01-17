import { v4 } from "uuid";

class UserModel {
  id: string;
  name: string;
  mail: string;
  verified: boolean;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(defaults: Partial<UserModel> = {}) {
    const {
      id = v4(),
      name = "",
      mail = "",
      password = "",
      verified = false,
      created_at = new Date(),
    } = defaults;

    this.id = id;
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.verified = verified;
    this.created_at = created_at;
    this.updated_at = new Date();
  }
}

export { UserModel };
