import instance from './config'

interface FunctionsPayload {
  [key: string]: any;
}

const functionsApi = {
  getAllFunctions(): Promise<any> {
    return instance.get('/functions/tree')
  },
  getAllFunctionsParent(): Promise<any> {
    return instance.get('/functions')
  },
  getFunctionById(id: string): Promise<any> {
    return instance.get(`/functions/get_by_id/${id}`)
  },
  createFunction(payload: FunctionsPayload): Promise<any> {
    return instance.post('/functions', payload)
  },
  updateFunction(id: string, payload: FunctionsPayload): Promise<any> {
    return instance.put(`/functions/${id}`, payload)
  },
  deleteFunction(id: string): Promise<any> {
    return instance.delete(`/functions/${id}`)
  }
}

export default functionsApi
