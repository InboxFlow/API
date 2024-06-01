class PaymentError {
  type: string;
  message: string;
  statusCode: number;

  constructor(message: string) {
    this.type = "Payment Required";
    this.message = message;
    this.statusCode = 402;
  }
}

export { PaymentError };
