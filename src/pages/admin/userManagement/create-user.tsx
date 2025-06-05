import { CONFIG } from 'src/config-global'

import { CreateUserView } from 'src/sections/admin/user-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Tạo người dùng - ${CONFIG.appName}`}</title>

      <CreateUserView />
    </>
  )
}
