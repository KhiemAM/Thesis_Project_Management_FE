import { Label } from 'src/components/label'
import { SvgColor } from 'src/components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />

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
    title: 'Quản lý tài khoản 2',
    path: '/products',
    icon: icon('ic-user'),
    children: [
      {
        title: 'Danh sách tài khoản 2',
        path: '/user1',
        icon: icon('ic-user')
      }
    ]
  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    )
  },
  {
    title: 'Tiến độ',
    path: '/progress',
    icon: icon('tabler-progress-check')
  }
]
