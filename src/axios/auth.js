import instance from './config'

const authApi = {
  register(payload) {
    return instance.post('/auth/register', payload)
  },
  refreshToken(payload) {
    return instance.post('/auth/refresh', payload)
  },
  changePassword(payload) {
    return instance.post('/auth/change-password', payload)
  },
  changePasswordByAdmin(payload) {
    return instance.post('/auth/change-password-by-admin', payload)
  }
}

export default authApi
