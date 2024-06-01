class ForbiddenError {
  type: string;
  message: string;
  statusCode: number;

  constructor(message?: string) {
    this.type = "Forbidden";
    this.message =
      message || "You do not have permission to access this resource";
    this.statusCode = 401;
  }
}

export { ForbiddenError };
