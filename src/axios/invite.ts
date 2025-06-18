import instance from './config'

interface InvitePayload {
  [key: string]: any;
}

const inviteApi = {
  getInvites(): Promise<any> {
    return instance.get('/invite/all-my-invites')
  },
  sendInvite(payload: InvitePayload): Promise<any> {
    return instance.post('/invite/send', payload)
  },
  acceptInvite(inviteId: string): Promise<any> {
    return instance.post(`/invite/accept/${inviteId}`)
  },
  rejectInvite(inviteId: string): Promise<any> {
    return instance.post(`/invite/reject/${inviteId}`)
  },
  revokeInvite(inviteId: string): Promise<any> {
    return instance.post(`/invite/revoke/${inviteId}`)
  }
}

export default inviteApi
