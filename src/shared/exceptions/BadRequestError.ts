class BadRequestError {
  type: string;
  message: string;
  statusCode: number;

  constructor(message: string) {
    this.type = "Bad Request";
    this.message = message;
    this.statusCode = 400;
  }
}

export { BadRequestError };
