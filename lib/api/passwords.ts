import { api } from './'

export async function postRequestPasswordReset(email: string) {
  const json = { email }

  return await api.post('request-password-reset', { json })
}

export async function postResetPassword(password, token) {
  const json = { password, token }

  return await api.post('reset-password', { json })
}
