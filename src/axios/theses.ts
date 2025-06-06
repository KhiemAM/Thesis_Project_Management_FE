import instance from './config'

interface ThesesPayload {
  [key: string]: any;
}

const thesesApi = {
  getAllTheses(): Promise<any> {
    return instance.get('/theses')
  },
  getAllMajor(): Promise<any> {
    return instance.get('/theses/getall/major')
  },
  getTheseById(id: string): Promise<any> {
    return instance.get(`/theses/${id}`)
  },
  getAllDepartments(): Promise<any> {
    return instance.get('/theses/getall/department/g')
  },
  createThese(payload: ThesesPayload): Promise<any> {
    return instance.post('/theses', payload)
  },
  updateThese(id: string, payload: ThesesPayload): Promise<any> {
    return instance.put(`/theses/${id}`, payload)
  },
  deleteThese(id: string): Promise<any> {
    return instance.delete(`/theses/${id}`)
  },
  getAllBatches(): Promise<any> {
    return instance.get('/theses/getall/batches')
  },
  getTheseByBatchId(batchId: string): Promise<any> {
    return instance.get(`/theses/by-batch/${batchId}`)
  }
}

export default thesesApi
