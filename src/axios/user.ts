import instance from './config'

interface UserPayload {
  [key: string]: any;
}

const userApi = {
  getAllUser(): Promise<any> {
    return instance.get('/users')
  },
  getUserById(id: string): Promise<any> {
    return instance.get(`/users/${id}`)
  },
  getUserLectures(): Promise<any> {
    return instance.get('/users/lecturers')
  },
  createUser(payload: UserPayload): Promise<any> {
    return instance.post('/users', payload)
  },
  updateUser(id: string, payload: UserPayload): Promise<any> {
    return instance.put(`/users/${id}`, payload)
  },
  deleteUser(id: string): Promise<any> {
    return instance.delete(`/users/${id}`)
  }
}

export default userApi
