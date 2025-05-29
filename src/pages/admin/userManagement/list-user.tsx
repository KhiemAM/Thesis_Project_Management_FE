import { CONFIG } from 'src/config-global'

import { ListUserView } from 'src/sections/admin/user-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Danh sách người dùng - ${CONFIG.appName}`}</title>

      <ListUserView />
    </>
  )
}
