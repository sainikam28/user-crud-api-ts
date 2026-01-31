export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
// This is a custom error class designed for standardized API error handling. Instead of throwing generic JavaScript Error objects, you throw ApiError with specific HTTP status codes and messages. This makes error handling consistent across your entire API.

