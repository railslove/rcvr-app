export class AppError extends Error {
  public statusCode: number

  constructor(name: string, message: string, code: number) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }

    this.name = name
    this.statusCode = code
  }
}
