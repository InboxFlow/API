import { v4 } from "uuid";

class Channel {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;

  constructor(defaults: Partial<Channel> = {}) {
    const {
      id = v4(),
      name = "",
      user_id = "",
      created_at = new Date().toISOString(),
    } = defaults;

    this.id = id;
    this.name = name;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = new Date().toISOString();
  }
}

export { Channel };
