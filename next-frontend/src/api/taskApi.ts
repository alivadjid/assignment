import { TaskApi } from "../../pages/api/tasks/list"
import { DeleteTaskApi } from "../../pages/api/tasks/delete"
import { TaskSummaryApi } from "../../pages/api/tasks/summary"

async function getTaskList(token: string): Promise<TaskApi[]> {
  const response = await fetch('/api/tasks/list', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  const data = await response.json()

  return data
}

async function deleteTask({token, id}: {token: string, id: string}): Promise<DeleteTaskApi> {
  const response = await fetch('/api/tasks/delete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({id})
  })
  const data = await response.json()

  return data
}

type CreateTaskData = Omit<TaskApi, 'id'>
async function createTask({token, taskData}: {token: string, taskData: CreateTaskData}): Promise<TaskApi> {
  const response = await fetch('/api/tasks/create', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
  const data = await response.json()

  return data
}

async function updateTask({token, taskData}: {token: string, taskData: CreateTaskData & { id: string }}): Promise<TaskApi[]> {
  const response = await fetch(`/api/tasks/${taskData.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
  const data = await response.json()

  return data
}

async function getSummary({token}: {token: string}): Promise<TaskSummaryApi> {
  const response = await fetch(`/api/tasks/summary`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()

  return data
}

async function getTaskById({token, id}: {token: string, id:string}): Promise<TaskApi> {
  console.log('getTAsk By id',token, id)
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()

  return data
}

const taskApi = { getTaskList, deleteTask, createTask, updateTask, getSummary, getTaskById }

export default taskApi