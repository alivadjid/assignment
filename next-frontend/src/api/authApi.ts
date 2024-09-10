import Cookies from 'js-cookie'

async function login(jsonData: {[k: string]: FormDataEntryValue}): Promise<{accessToken: string} | string> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  })
  console.log('data', response)
  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    return response.statusText
  }
  
}

async function getUser(token: string): Promise<{username: string}> {
  const response = await fetch('/api/auth/profile', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  if (response.status === 401) {
    Cookies.remove('isAuthenticated')
    localStorage.removeItem('appState')
  }

  const data = await response.json()

  return data
}

async function register(jsonData: {[k: string]: FormDataEntryValue}): Promise<{username: string} | {error: string, message: string[], statusCode: number}> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(jsonData),
  })

  const data = await response.json()

  return data
}

const authApi = { login, getUser, register }

export default authApi
