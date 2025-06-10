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
  },
  getLecturerProfile(): Promise<any> {
    return instance.get('/lecturer-profile')
  },
  createLecturerProfile(payload: ProfilePayload): Promise<any> {
    return instance.post('/lecturer-profile', payload)
  },
  updateLecturerProfile(payload: ProfilePayload): Promise<any> {
    return instance.put('/lecturer-profile', payload)
  },
  getAllStudentsProfiles(): Promise<any> {
    return instance.get('/student-profile/gett-all')
  }
}

export default profileApi
