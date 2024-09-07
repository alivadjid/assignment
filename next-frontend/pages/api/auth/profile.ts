import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../utils/api/api'


type ProfileApi = {
  username: string
  sub: string
  iat: number
  exp: number
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers
  try {
    const {data, status} = await api.get<ProfileApi>('/auth/profile', {headers})

    if (status === 200) {
      res.status(200).json(data)
    }

  } catch(error) {
    res.status(400).json(error)
  }
}