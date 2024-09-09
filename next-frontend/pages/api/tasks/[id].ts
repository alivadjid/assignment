import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../utils/api/api'
import { TaskApi } from './list'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers
  const frontData = req.body
  const id = req.query.id
  try {
    const {data, status} = await api.put<TaskApi>(`/tasks/${id}`, frontData, {
      headers
    })
    
    if (status === 200) {
      res.status(200).json(data)
    }

  } catch(error) {
    res.status(400).json(error)
  }
}