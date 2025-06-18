import { Iconify } from 'src/components/iconify'

import type { AccountPopoverProps } from './components/account-popover'

// ----------------------------------------------------------------------

export const _accountStudent: AccountPopoverProps['data'] = [
  {
    label: 'Trang chủ',
    href: '/student',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />
  },
  {
    label: 'Hồ sơ',
    href: '/student/profile',
    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />
  }
  // {
  //   label: 'Cài đặt',
  //   href: '#',
  //   icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
  // },
]
