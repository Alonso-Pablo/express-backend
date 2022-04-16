import { Request, Response } from 'express'
import service from '../../services/user/user.service'
import { User } from '../../entities/user.entity'

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  const user = await service.getUserById(userId)

  if (user === false) {
    return res.status(400).json({ statusCode: 404, message: 'Bad Request'})
  }

  if ((user !== null) && (user.deleted === false)) {
    const publicUserInformation: Partial<User> = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      deleted: user.deleted,
    }

    return res.status(200).json({
      statusCode: 200,
      message: {
        user: publicUserInformation,
      }
    })
  }

  return res.status(404).json({ statusCode: 404, message: 'Not Found'})
}

const getUsers = async (req: Request, res: Response) => {
  const token = req.headers.authorization
  // const users = await service.getUsers()

  // if (users) return res.status(200).json({ statusCode: 200, message: users })
  // return res.status(400).json({ statusCode: 400, message: 'Bad Request' })
}



export default Object.freeze({
  getUsers,
  getUser,
})
