import instance from './config'

interface GroupPayload {
  [key: string]: any;
}

const groupApi = {
  getGroups(): Promise<any> {
    return instance.get('/group/my-groups')
  },
  createGroup(payload: GroupPayload): Promise<any> {
    return instance.post('/group', payload)
  }
}

export default groupApi
