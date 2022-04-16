import userRepository from '../../prisma/repositories/user'
import bcrypt from 'bcrypt'
import { User } from 'src/entities/user.entity'
const saltRounds = 10

const getUserById = async (id: string) => {
  const user: User | null | false = await userRepository.findById(id)
  return user
}

const getUsers = async () => {
  const users = await userRepository.findAll()
  return users
}

const getUserByEmail = async (email: string) => {
  const user = await userRepository.findByEmail(email)
  return user
}

const postUser = async (userCredentials: { email: string, password: string}) => {
  const hashedPassword = await bcrypt.hash(userCredentials.password, saltRounds)
  const newUserCredentials = {...userCredentials, password: hashedPassword} 
  
  const newUser = await userRepository.createUser(newUserCredentials)
  return newUser
}

const isValidPassword = async (password: string, savedPassword: string) => {
  const compare = await bcrypt.compare(password, savedPassword)
  return compare
}

export default Object.freeze({
  getUsers,
  getUserById,
  getUserByEmail,
  postUser,
  isValidPassword
})
