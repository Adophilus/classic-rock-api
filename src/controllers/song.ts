import ExpressAsyncHandler from 'express-async-handler';
import { Controller, Get, Put, ClassWrapper, Wrapper, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'
import SongsRepository from "@/repositories/song"

@Controller('songs')
@ClassWrapper(ExpressAsyncHandler)
export default class Song {
  private readonly logger: Logger<ILogMessage>

  constructor({
    logger
  }: {
    logger: Logger<ILogMessage>
  }) {
    this.logger = logger
  }

  @Get()
  private async getSongs(req: Request, res: Response) {
    const songs = await SongsRepository.getAll()
    res.status(StatusCodes.OK).json(songs)
  }

  @Get(':id')
  private async getSongById(req: Request, res: Response) {
    const { id } = req.params
    const song = await SongsRepository.getById(parseInt(id))
    res.status(StatusCodes.OK).json(song)
  }

  @Put(':id/banned')
  private async getSongBannedStatus(req: Request, res: Response) {
    const { id } = req.params
    const song = await SongsRepository.getById(parseInt(id))
    res.status(StatusCodes.OK).json({ is_banned: song.is_banned })
  }

  @Put(':id/ban')
  private async banSongById(req: Request, res: Response) {
    const { id } = req.params
    const song = await SongsRepository.getById(parseInt(id))
    await song.update({ is_banned: true })
    res.status(StatusCodes.NO_CONTENT).send()
  }

  @Put(':id/unban')
  private async unbanSongById(req: Request, res: Response) {
    const { id } = req.params
    const song = await SongsRepository.getById(parseInt(id))
    await song.update({ is_banned: false })
    res.status(StatusCodes.NO_CONTENT).send()
  }

  @Delete(':id')
  private async deleteSongById(req: Request, res: Response) {
    const { id } = req.params
    const song = await SongsRepository.getById(parseInt(id))
    await song.destroy()
    res.status(StatusCodes.GONE).send()
  }
}
