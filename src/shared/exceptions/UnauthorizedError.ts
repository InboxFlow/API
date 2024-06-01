class UnauthorizedError {
  type: string;
  message: string;
  statusCode: number;

  constructor(message?: string) {
    this.type = "Unauthorized";
    this.message = message || "You are not logged in";
    this.statusCode = 401;
  }
}

export { UnauthorizedError };
