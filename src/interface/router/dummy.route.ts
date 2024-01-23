import { Router } from 'express'

import { validation } from '../../infrastructure/helpers/validator'
import { createDummyController } from '../controller/dummy/create-dummy.controller'
import { deleteDummyController } from '../controller/dummy/delete-dummy.controller'
import { getDummyController } from '../controller/dummy/get-dummy.controller'
import { updateDummyController } from '../controller/dummy/update-dummy.controller'
import { createDummySchema } from '../validation/dummy/create-dummy.schema'
import { getDummySchema } from '../validation/dummy/get-test.schema'

const route = Router()

route.get('/', getDummyController)
route.post('/', validation(createDummySchema), createDummyController)
route.patch('/', validation(createDummySchema), updateDummyController)
route.delete('/', validation(getDummySchema), deleteDummyController)

export const dummyRoute = route
