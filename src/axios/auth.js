import instance from './config'

const authApi = {
  register(payload) {
    return instance.post('/auth/register', payload)
  },
  login(payload) {
    return instance.post('/auth/login', payload)
  }
}

export default authApi
