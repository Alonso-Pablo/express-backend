import { prisma } from '../index'
import { isValidMongoId } from '../../utils/utils'

const findAll = async () => {
  const users = await prisma.users.findMany({
    where: {
      deleted: false
    }
  })

  return users || null
}

const findById = async (id: string) => {
  if (!(isValidMongoId(id))) return false

  const user = await prisma.users.findFirst({
    where: {
      id,
      deleted: false
    }
  })

  return user || null
}

const findByEmail = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
      deleted: false
    }
  })

  return user || null
}

const createUser = async (userCredentials: { email: string, password: string}) => {
  const newUser = await prisma.users.create({ data: userCredentials })
  return newUser
}

export default Object.freeze({ findAll, findById, findByEmail, createUser })
