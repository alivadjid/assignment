import { TaskApi } from "../../pages/api/tasks/list"

async function getTaskList(token: string): Promise<TaskApi[]> {
  console.log('taskApi', token)
  const response = await fetch('/api/tasks/list', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  const data = await response.json()
  console.log('data', data)

  return data
}

async function deleteTask({token, id}: {token: string, id: string}): Promise<TaskApi[]> {
  console.log('taskApi', token)
  const response = await fetch('/api/tasks/delete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({id})
  })
  const data = await response.json()
  console.log('data', data)

  return data
}

const taskApi = { getTaskList, deleteTask }

export default taskApi