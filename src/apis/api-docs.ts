import fs from 'node:fs'

import Express from 'express'
import type { JsonObject } from 'swagger-ui-express'
import swaggerUI from 'swagger-ui-express'

export const apiDocs = (router: Express.Router) => {
  const openAPIJsonFile = 'api-docs/_openapi.json'

  // Serves static swagger.json
  const swaggerDocument = JSON.parse(
    fs.readFileSync(openAPIJsonFile, 'utf8'),
  ) as JsonObject
  router.use('/api-docs/openapi.json', Express.static(openAPIJsonFile))

  // Serves Swagger UI
  router.use('/api-docs', swaggerUI.serve)
  router.get('/api-docs', swaggerUI.setup(swaggerDocument))
  return router
}
