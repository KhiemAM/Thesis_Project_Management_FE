import instance from './config'

interface RolesPayload {
  [key: string]: any;
}

const rolesApi = {
  getAllRoles(): Promise<any> {
    return instance.get('/roles')
  },
  getRoleById(id: string): Promise<any> {
    return instance.get(`/roles/${id}`)
  },
  // getRoleFunctionsAssignPermission(): Promise<any> {
  //   return instance.get('/roles/assign/permission')
  // },
  createRole(payload: RolesPayload): Promise<any> {
    return instance.post('/roles/create-with-functions', payload)
  },
  updateRole(id: string, payload: RolesPayload): Promise<any> {
    return instance.put(`/roles/${id}`, payload)
  },
  deleteFunction(id: string): Promise<any> {
    return instance.delete(`/functions/${id}`)
  }
}

export default rolesApi
