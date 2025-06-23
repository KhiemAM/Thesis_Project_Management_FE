import instance from './config'

interface CouncilPayload {
  [key: string]: any;
}

const councilApi = {
  getCouncils(): Promise<any> {
    return instance.get('/councils')
  },
  createCouncil(payload: CouncilPayload ): Promise<any> {
    return instance.post('/councils', payload)
  }
}

export default councilApi
