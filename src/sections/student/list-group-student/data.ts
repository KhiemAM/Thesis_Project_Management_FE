import type { Group } from './types'

export interface UserData {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  type: string;
}

export const userSuggestions: UserData[] = [
  {
    id: '1',
    username: '2001210783',
    displayName: 'Huỳnh Quang Khiêm',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    type: 'inviter'
  },
  {
    id: '2',
    username: '2001210783',
    displayName: 'Hà Trang',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    type: 'inviter'
  },
  {
    id: '3',
    username: '2001210783',
    displayName: 'Hà Trang',
    profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    type: 'inviter'
  }
]

export const groupData: Group = {
  id: '1',
  name: 'Nhóm Aitilon',
  description: 'Nhóm học tập Aitilon',
  leader_id: '1',
  coverImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500',
  members: [
    {
      user_id: '1',
      student_code: '2001210783',
      full_name: 'Huỳnh Quang Khiêm',
      avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      is_leader: true
    },
    {
      user_id: '2',
      student_code: '2001210783',
      full_name: 'Hà Trang',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      is_leader: false
    },
    {
      user_id: '3',
      student_code: '2001210783',
      full_name: 'Hà Trang',
      avatarUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      is_leader: false
    }
  ]
}