import instance from './config'

interface ThesesPayload {
  [key: string]: any;
}

const thesesApi = {
  getAllTheses(): Promise<any> {
    return instance.get('/theses')
  },
  getTheseById(id: string): Promise<any> {
    return instance.get(`/theses/${id}`)
  },
  createThese(payload: ThesesPayload): Promise<any> {
    return instance.post('/theses', payload)
  },
  updateThese(id: string, payload: ThesesPayload): Promise<any> {
    return instance.put(`/theses/${id}`, payload)
  },
  deleteThese(id: string): Promise<any> {
    return instance.delete(`/theses/${id}`)
  }
}

export default thesesApi
