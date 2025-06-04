import instance from './config'

interface ProfilePayload {
  [key: string]: any;
}

const profileApi = {
  getStudentProfile(): Promise<any> {
    return instance.get('/student-profile')
  },
  createStudentProfile(payload: ProfilePayload): Promise<any> {
    return instance.post('/student-profile', payload)
  },
  updateStudentProfile(payload: ProfilePayload): Promise<any> {
    return instance.put('/student-profile', payload)
  }
}

export default profileApi
