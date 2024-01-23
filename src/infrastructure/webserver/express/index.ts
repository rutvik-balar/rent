import cors from 'cors'
import express from 'express'
import { ConfigurationOptions, I18n } from 'i18n'

import { path } from '../../../apis'
import { LoggerStream } from '../../../infrastructure/helpers/logger'
import EN from '../../configs/language/en'
import HI from '../../configs/language/hi'
import { env } from '../../env'
import { sequelize } from '../../orm/sequelize'

export const createServer = () => {
  const app = express()

  const options: cors.CorsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }
  app.use(cors(options))

  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    )

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Content-Type, X-Ad-Token, X-Test',
    )

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 1)

    // Pass to next layer of middleware
    next()
  })

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const i18n = new I18n()
  i18n.configure({
    staticCatalog: {
      en: EN,
      hi: HI,
    },
    defaultLocale: 'en',
  } as ConfigurationOptions)
  app.use(i18n.init)
  env.SEQUELIZE_SYNCHRONIZE && sequelize.sync()
  app.use('/v1', path())

  const port = env.APPSERVER_PORT || 3000

  app.listen(port, () => {
    LoggerStream.write(`Server app listening at http://localhost:${port}`)
  })
}
