import { v4 } from "uuid";

class Call {
  id: string;
  user_id: string;
  channel_id: string;
  method: string;
  request: string;
  response: string;
  token: string;
  created_at: string;
  updated_at: string;

  constructor(defaults: Partial<Call> = {}) {
    const {
      id = v4(),
      channel_id = "",
      user_id = "",
      method = "",
      request = "",
      response = "",
      token = "",
      created_at = new Date().toISOString(),
    } = defaults;

    this.id = id;
    this.channel_id = channel_id;
    this.user_id = user_id;
    this.method = method;
    this.request = request;
    this.response = response;
    this.token = token;
    this.created_at = created_at;
    this.updated_at = new Date().toISOString();
  }
}

export { Call };
