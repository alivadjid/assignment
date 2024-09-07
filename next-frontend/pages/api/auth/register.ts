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
  console.log('handler registrer')
  const frontData = req.body
  console.log('frontData',frontData)
  try {
    const {data, status} = await api.post<UserApi>('/users', {
      ...JSON.parse(frontData)
    })
    console.log('data', data, status, status)
    if (status === 201) {
      res.status(200).json(data)
    }

  } catch(error) {
    res.status(400).json(error)
  }
}