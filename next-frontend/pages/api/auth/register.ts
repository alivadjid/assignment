import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../utils/api/api'


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
  try {
    const {data, status} = await api.post<UserApi>('/users', {
      ...JSON.parse(frontData)
    })
    if (status === 201) {
      res.status(200).json(data)
    }

  } catch(error) {
    res.status(400).json(error)
  }
}