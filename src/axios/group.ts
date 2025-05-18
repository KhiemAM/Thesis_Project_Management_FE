import instance from './config'

interface GroupPayload {
  [key: string]: any;
}

const groupApi = {
  createGroup(payload: GroupPayload): Promise<any> {
    return instance.post('/group', payload)
  }
}

export default groupApi
