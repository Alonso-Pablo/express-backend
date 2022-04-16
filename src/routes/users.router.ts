import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/user/user.controller'

const router = Router()

router.get('/:userId', passport.authenticate('jwt', { session: false }), controller.getUser)
router.get('/', passport.authenticate('jwt', { session: false }), controller.getUsers)

export default router
