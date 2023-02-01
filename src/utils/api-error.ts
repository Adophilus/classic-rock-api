import { StatusCodes } from 'http-status-codes'

export default class APIError extends Error {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  constructor(message: string) {
    super(message)
  }
}
