import type { NextApiRequest, NextApiResponse } from 'next'
import { api, isAxiosError } from '../../../utils/api/api'

type Token = {
  accessToken: string
}

type LoginApi = {
  data: Token
  status: number
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const frontData = req.body

  try {
    const {data, status} = await api.post<LoginApi>('/auth/login', frontData)

    if (status === 200) {
      res.status(200).json(data)
    }

  } catch(error) {
    if(isAxiosError(error)) {
      if (error.response?.status === 400) {
        res.status(400).json({ error: 'Invalid credentials' })
      } else if (error.response?.status === 401) {
        res.status(401).json({ error: 'Unauthorized' })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
    
  }
}