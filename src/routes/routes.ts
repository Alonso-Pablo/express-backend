import { Application, Router } from 'express'
import userRouter from './users.router'
import authRouter from './auth.router'

const router = (app : Application) => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
  router.use('/users', userRouter)
}

export default router
