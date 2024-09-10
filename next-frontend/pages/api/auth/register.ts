import type { NextApiRequest, NextApiResponse } from 'next'
import { api, isAxiosError } from '../../../utils/api/api'


type UserApi = {
  username: string
  password: string
  id: number
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const frontData = req.body
  console.log('register', req.body)
  try {
    const {data, status} = await api.post<UserApi>('/auth/register', {
      ...JSON.parse(frontData)
    })
    console.log('data', data, status)
    if (status === 200) {
      res.status(200).json(data)
    }

  } catch(error) {
    if(isAxiosError(error)) {
      if (error.response?.status === 400) {
        res.status(400).json({ error: error.response.data })
      } else if (error.response?.status === 401) {
        res.status(401).json({ error: 'Unauthorized' })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}