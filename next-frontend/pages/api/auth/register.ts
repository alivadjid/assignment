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
  console.log('register', req.body)
  try {
    const {data, status} = await api.post<UserApi>('/auth/register', {
      ...JSON.parse(frontData)
    })
    console.log('data', data, status)
    if (status === 201) {
      res.status(201).json(data)
    }

  } catch(error) {
    console.log('error', error)
    res.status(400).json(error)
  }
}