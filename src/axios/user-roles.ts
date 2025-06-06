import instance from './config'

interface UserRolesPayload {
  [key: string]: any;
}

const userRolesApi = {
  getAllRolesOfUser(userId: string | null): Promise<any> {
    return instance.get(`/user-roles/user/${userId}`)
  },
  createUserRole(payload: UserRolesPayload): Promise<any> {
    return instance.post('/user-roles', payload)
  },
  updateUserRole(id: string | null, payload: UserRolesPayload): Promise<any> {
    return instance.put(`/user-roles/${id}`, payload)
  }
}

export default userRolesApi
