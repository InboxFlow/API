import { v4 } from "uuid";

class AccountModel {
  id: string;
  provider: string;
  mail: string;
  avatar: string;
  user_id: string;
  created_at: string;
  updated_at: string;

  constructor(defaults: Partial<AccountModel> = {}) {
    const {
      id = v4(),
      mail = "",
      avatar = "",
      provider = "google",
      user_id = "",
      created_at = new Date().toISOString(),
    } = defaults;

    this.id = id;
    this.avatar = avatar;
    this.mail = mail;
    this.provider = provider;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = new Date().toISOString();
  }
}

export { AccountModel };
