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
  },
  removeMember(groupId: string, studentId: string): Promise<any> {
    return instance.delete(`/group/${groupId}/remove-member/${studentId}`)
  },
  updateNameGroup(groupId: string, payload: GroupPayload): Promise<any> {
    return instance.put(`/group/${groupId}/name`, payload)
  }
}

export default groupApi
