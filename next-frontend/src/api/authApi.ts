async function login(jsonData: {[k: string]: FormDataEntryValue}): Promise<{accessToken: string}> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  })

  const data = await response.json()
  return data
}

async function getUser(token: string): Promise<{username: string}> {
  const response = await fetch('/api/auth/profile', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  const data = await response.json()

  return data
}
const authApi = { login, getUser }

export default authApi