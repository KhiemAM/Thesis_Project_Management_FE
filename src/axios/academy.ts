import instance from './config'

const academyApi = {
  getAcademyYears(): Promise<any> {
    return instance.get('/academy/years')
  },
  getAcademySemestes(id: string): Promise<any> {
    return instance.get(`/academy/years/${id}/semesters`)
  },
  getAcademyBatches(id: string): Promise<any> {
    return instance.get(`/academy/semesters/${id}/batches`)
  }
}

export default academyApi
