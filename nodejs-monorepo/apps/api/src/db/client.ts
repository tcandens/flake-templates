import { MongoClient, ObjectId } from 'mongodb'
import { env } from '../config'

export const client = new MongoClient(env.MONGO_URL)

export const db = client.db('grindcorps')

type Entity = {
  _id: ObjectId
  [key: string]: unknown
}

export const mapId = (entity: Entity) => {
  return {
    ...entity,
    id: entity._id.toString(),
  }
}

export const mapIdList = (entities: Entity[]) => {
  return entities.map(mapId)
}

