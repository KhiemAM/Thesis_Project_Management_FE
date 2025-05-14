import { CONFIG } from 'src/config-global'

import { ListRoleView } from 'src/sections/admin/role-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Danh sách vai trò - ${CONFIG.appName}`}</title>

      <ListRoleView />
    </>
  )
}
