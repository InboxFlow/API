class NotFoundError {
  type: string;
  message: string;
  statusCode: number;

  constructor(message?: string) {
    this.type = "Not Found";
    this.message = message || "The requested resource could not be found";
    this.statusCode = 401;
  }
}

export { NotFoundError };
