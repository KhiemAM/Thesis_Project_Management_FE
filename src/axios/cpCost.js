import instance from './config'

const cpCostApi = {
  create(payload) {
    return instance.post('/cp-cost', payload)
  },
  update(id, payload) {
    return instance.put(`/cp-cost/${id}`, payload)
  },
  delete(id, payload) {
    return instance.delete(`/cp-cost/${id}`, payload)
  },
  getAll(payload) {
    return instance.get('/cp-cost', {
      params: payload
    })
  },
  getAllFillteredByOrgId(payload) {
    return instance.get('/cp-cost/filltered-parent-org-id', {
      params: payload
    })
  },
  getAllNoPaginate() {
    return instance.get('/cp-cost/no-pagination')
  }
}

export default cpCostApi
