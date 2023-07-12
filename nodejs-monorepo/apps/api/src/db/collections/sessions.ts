import { ObjectId } from 'mongodb'
import { db } from '../client'

const collection = db.collection('sessions')

export async function createSession(session: any) {
  return await collection.insertOne(session)
}

export async function getSession(id: string) {
  return await collection.findOne({
    _id: new ObjectId(id)
  })
}
