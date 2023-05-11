import ownerRouter from '@route/owner.route.js'
import petRouter from '@route/pet.route.js'

import { Router } from '@class/Router.js'

const router = new Router()

router.use('/owner', ownerRouter)
router.use('/pet', petRouter)

export default router
