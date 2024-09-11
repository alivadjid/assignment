import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../utils/api/api'
import { TaskApi } from './list'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, body } = req
  const id = req.query.id

  switch(method) {
    case 'GET': {
      await getHandler()
      break
    }
    case 'PUT': {
      await putHandler()
      break
    }
    default: {
      res.status(405).json({ error: 'Method not allowed' })
    }
  }

  async function putHandler() {
    try {
      const {data, status} = await api.put<TaskApi>(`/tasks/${id}`, body, {
        headers
      })
      
      if (status === 200) {
        res.status(200).json(data)
      }
  
    } catch(error) {
      res.status(400).json(error)
    }
  }

  async function getHandler() {
    try {
      const {data, status} = await api.get<TaskApi>(`/tasks/${id}`, {
        headers
      })
      
      if (status === 200) {
        res.status(200).json(data)
      }
  
    } catch(error) {
      res.status(400).json(error)
    }
  }
}

