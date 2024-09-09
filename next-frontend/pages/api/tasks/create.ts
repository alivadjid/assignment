import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../utils/api/api'
import { TaskApi } from './list'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers
  const frontData = req.body

  try {
    const {data, status} = await api.post<TaskApi>('/tasks', frontData, {
      headers
    })
    
    if (status === 201) {
      res.status(201).json(data)
    }

  } catch(error) {
    res.status(400).json(error)
  }
}