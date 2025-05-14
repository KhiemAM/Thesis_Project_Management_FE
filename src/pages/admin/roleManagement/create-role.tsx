import { CONFIG } from 'src/config-global'

import { CreateRoleView } from 'src/sections/admin/role-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Thêm vai trò mới - ${CONFIG.appName}`}</title>

      <CreateRoleView />
    </>
  )
}
