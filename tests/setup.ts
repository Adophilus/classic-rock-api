import { app } from '@/server'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

export const client = chai.request(app).keepOpen()
