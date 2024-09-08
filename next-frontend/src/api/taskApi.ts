import { TaskApi } from "../../pages/api/tasks/list"
import { DeleteTaskApi } from "../../pages/api/tasks/delete"

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

const taskApi = { getTaskList, deleteTask }

export default taskApi