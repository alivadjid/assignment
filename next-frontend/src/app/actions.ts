'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(name: string) {
  redirect(`/${name}`)
}