import { Sequelize } from 'sequelize-typescript'
import config from '@/config'
import { Song } from '@/models'
import { Logger } from 'tslog'

export default {
  init(logger: Logger<ILogMessage>) {
    return new Sequelize(config.db.uri, config.db.username, config.db.password, {
      dialect: config.db.dialect,
      models: [
        Song
      ],
      logging: (msg) => logger.debug(msg)
    });
  }
}
