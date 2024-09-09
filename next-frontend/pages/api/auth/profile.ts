import type { NextApiRequest, NextApiResponse } from 'next'
import { api, isAxiosError } from '../../../utils/api/api'

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
  try {
  const headers = req.headers
    const {data, status} = await api.get<ProfileApi>('/auth/profile', {headers})
    if (status === 200) {
      res.status(200).json(data)
    }
  } catch(error) {
    if (isAxiosError(error)) {
      if (error.status === 401) {
        res.status(401).json({message: 'Unauthorized'})
      }
    }
    
    res.status(400).json(error)
  }
}