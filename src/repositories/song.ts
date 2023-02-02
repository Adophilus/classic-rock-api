import { StatusCodes } from 'http-status-codes'
import Song from '@/models/song'
import APIError from '@/utils/api-error'

class SongNotFoundError extends APIError {
  statusCode = StatusCodes.NOT_FOUND

  constructor({ id }: { id: number }) {
    super(`Song with id ${id} does not exist`)
  }
}

export default class SongsRepository {
  public static async getAll() {
    const songs = await Song.findAll()
    return songs
  }

  public static async getById(id: number) {
    const song = await Song.findOne({ where: { id } })
    if (!song)
      throw new SongNotFoundError({ id })
    return song
  }
}
