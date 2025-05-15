import { CONFIG } from 'src/config-global'

import { UpdateRoleView } from 'src/sections/admin/role-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Cập nhật vai trò - ${CONFIG.appName}`}</title>

      <UpdateRoleView />
    </>
  )
}
