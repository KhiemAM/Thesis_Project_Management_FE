import { SvgColor } from 'src/components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/student/${name}.svg`} />

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  isConfirmDialog?: boolean;
};

export const navData = [
  {
    title: 'Trang chủ',
    path: '/student',
    icon: icon('mingcute--home-4-line')
  },
  {
    title: 'Thông tin cá nhân',
    path: '/student/profile',
    icon: icon('iconamoon--profile')
  },
  {
    title: 'Tìm kiếm',
    path: '/student/search',
    icon: icon('mingcute--search-3-line')
  },
  {
    title: 'Lời mời',
    path: '/student/invite',
    icon: icon('solar--user-plus-linear')
  },
  {
    title: 'Tạo nhóm',
    path: '/student/group',
    icon: icon('solar--users-group-rounded-linear')
  },
  {
    title: 'Quản lý nhóm',
    path: '/student/group-list',
    icon: icon('solar--users-group-rounded-linear')
  }
]

export const navBottomData = [
  {
    title: 'Cài đặt khác',
    path: '/more',
    icon: icon('solar--list-line-duotone')
  },
  {
    title: 'Đăng xuất',
    path: '/logout',
    icon: icon('solar--logout-outline'),
    isConfirmDialog: true
  }
]
