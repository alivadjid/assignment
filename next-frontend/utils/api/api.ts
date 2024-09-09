import axios, { AxiosError } from 'axios'

export function isAxiosError(error: unknown): error is AxiosError {
  return error !== null && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError === true
}

export const api = axios.create({
  baseURL: process.env.BACKEND_URL,
})

