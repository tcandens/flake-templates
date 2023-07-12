import { ObjectId } from 'mongodb'
import { db, mapIdList, mapId } from '../client'
import type { Task, TaskInput, TaskOutput } from '@grndcrps/app/models/task'

const name = 'tasks'

const collection = db.collection<Task>(name)

export async function createTask(task: TaskInput) {
  return await collection.insertOne({
    ...task,
  })
}

export async function getTask(id: string) {
  return collection.findOne({
    _id: new ObjectId(id)
  }).then(mapId)
}

export async function allTasks() {
  return collection.find().toArray().then(mapIdList)
}
