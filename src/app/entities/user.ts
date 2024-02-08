import { v4 } from "uuid";

class User {
  id: string;
  name: string;
  mail: string;
  verified: boolean;
  password: string;
  created_at: string;
  updated_at: string;

  constructor(defaults: Partial<User> = {}) {
    const {
      id = v4(),
      name = "",
      mail = "",
      password = "",
      verified = false,
      created_at = new Date().toISOString(),
    } = defaults;

    this.id = id;
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.verified = verified;
    this.created_at = created_at;
    this.updated_at = new Date().toISOString();
  }
}

export { User };
