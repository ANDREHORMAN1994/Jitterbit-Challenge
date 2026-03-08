interface ErrorMessage {
  statusCode: number;
  message: string;
  name: string;
}

class ErrorMessage extends Error {
  constructor(statusCode: number, message: string) {
    super();

    this.statusCode = statusCode;
    this.message = message;
    this.name = 'BadRequestError';
  }
}

export default ErrorMessage;
