import instance from './config'

interface RolesPayload {
  [key: string]: any;
}

const rolesApi = {
  getAllRoles(): Promise<any> {
    return instance.get('/roles')
  },
  getAllFunctionsParent(): Promise<any> {
    return instance.get('/functions')
  },
  getFunctionById(id: string): Promise<any> {
    return instance.get(`/functions/get_by_id/${id}`)
  },
  createFunction(payload: RolesPayload): Promise<any> {
    return instance.post('/functions', payload)
  },
  updateFunction(id: string, payload: RolesPayload): Promise<any> {
    return instance.put(`/functions/${id}`, payload)
  },
  deleteFunction(id: string): Promise<any> {
    return instance.delete(`/functions/${id}`)
  }
}

export default rolesApi
