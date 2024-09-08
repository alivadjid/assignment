import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../utils/api/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers
  const body = req.body
  console.log('headers', body)
  console.log('headers', headers)
  try {
    const {data, status} = await api.delete(`/tasks/${JSON.parse(body).id}`, {headers})
    console.log('data', data)
    if (status === 200) {
      res.status(200).json({deleted: true})
    }

  } catch(error) {
    res.status(400).json(error)
  }
}