import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../utils/api/api'

type ApiRequest = {
  data: {
    access_token: string
  },
  status: number
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const frontData = req.body

  try {
    const {data, status} = await api.post<ApiRequest>('/auth/login', frontData)

    if (status === 200) {
      res.status(200).json(data)
    }

  } catch(error) {
    res.status(400).json(error)
  }
}