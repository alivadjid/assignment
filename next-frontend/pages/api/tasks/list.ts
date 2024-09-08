import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../utils/api/api'


export type TaskApi = {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'inProgress' | 'completed'
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers
  try {
    const {data, status} = await api.get<TaskApi[]>('/tasks', {headers})
    if (status === 200) {
      res.status(200).json(data)
    }

  } catch(error) {
    res.status(400).json(error)
  }
}