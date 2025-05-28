import instance from './config'

const authApi = {
  register(payload) {
    return instance.post('/auth/register', payload)
  },
  refreshToken(payload) {
    return instance.post('/auth/refresh', payload)
  }
}

export default authApi
