export class UnAuthorizedError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 401
  }
}

export class NotFoundError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 404
  }
}

export class BadRequestError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 400
  }
}
