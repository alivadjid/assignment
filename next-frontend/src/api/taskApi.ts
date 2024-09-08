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

const taskApi = { getTaskList }

export default taskApi