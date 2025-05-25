import { SvgColor } from 'src/components/svg-color'

// ----------------------------------------------------------------------
const DEFAULT_GROUP_ID = 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b0'
const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/admin/${name}.svg`} />

type NavItemChildren = {
  title: string;
  path: string;
}

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  children?: NavItemChildren[];
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics')
  },
  {
    title: 'Quản lý tài khoản',
    path: '/user',
    icon: icon('ic-user'),
    children: [
      {
        title: 'Danh sách tài khoản',
        path: '/user/list'
      },
      {
        title: 'Thêm tài khoản',
        path: '/user/create'
      },
      {
        title: 'Cập nhật tài khoản',
        path: '/user/update'
      }
    ]
  },
  {
    title: 'Quản lý chức năng',
    path: '/function',
    icon: icon('solar--settings-bold-duotone'),
    children: [
      {
        title: 'Danh sách chức năng',
        path: '/function/list'
      },
      {
        title: 'Thêm chức năng',
        path: '/function/create'
      },
      {
        title: 'Cập nhật chức năng',
        path: '/function/update'
      }
    ]
  },
  {
    title: 'Quản lý vai trò',
    path: '/role',
    icon: icon('solar--shield-user-bold-duotone'),
    children: [
      {
        title: 'Danh sách vai trò',
        path: '/role/list'
      },
      {
        title: 'Thêm vai trò',
        path: '/role/create'
      },
      {
        title: 'Cập nhật vai trò',
        path: '/role/update'
      }
    ]
  },
  {
    title: 'Quản lý đề xuất đề tài',
    path: '/topic-proposal',
    icon: icon('solar--document-add-bold-duotone'),
    children: [
      {
        title: 'Danh sách đề xuất đề tài',
        path: '/topic-proposal/list'
      },
      {
        title: 'Lập đề xuất đề tài',
        path: '/topic-proposal/create'
      },
      {
        title: 'Duyệt đề tài',
        path: '/topic-proposal/approve'
      }
    ]
  },
  {
    title: 'Quản lý nhóm',
    path: '/group',
    icon: icon('solar--users-group-two-rounded-bold-duotone'),
    children: [
      {
        title: 'Danh sách nhóm sinh viên',
        path: '/group/list'
      },
      {
        title: 'Thông tin nhóm sinh viên',
        path: `/group/information/${DEFAULT_GROUP_ID}` //Default group ID
      },
      {
        title: 'Tiến độ nhóm sinh viên',
        path: `/group/progress/${DEFAULT_GROUP_ID}` //Default group ID
      }
    ]
  },
  {
    title: 'Tiến độ',
    path: '/progress',
    icon: icon('tabler-progress-check')
  }
]
