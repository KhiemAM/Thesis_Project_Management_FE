import { CONFIG } from 'src/config-global'

import { ProfileUserView } from 'src/sections/admin/user-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Thông tin người dùng - ${CONFIG.appName}`}</title>

      <ProfileUserView />
    </>
  )
}
