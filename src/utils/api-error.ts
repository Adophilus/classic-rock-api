import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export default class APIError extends Error {
  public statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  declare public message: string

  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(message)
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode
    }
  }
}
