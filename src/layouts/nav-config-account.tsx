import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Trang chủ',
    href: '/',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'Hồ sơ',
    href: '/user/profile',
    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
  },
  // {
  //   label: 'Cài đặt',
  //   href: '#',
  //   icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
  // },
];
