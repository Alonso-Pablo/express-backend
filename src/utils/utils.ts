import { ObjectId } from 'mongodb'

export function isValidMongoId(id: string) {
  return new ObjectId(id).toString() === id
}