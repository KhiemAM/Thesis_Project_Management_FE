import { CONFIG } from 'src/config-global'

import { DetailProfileUserView } from 'src/sections/admin/user-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Thông tin người dùng - ${CONFIG.appName}`}</title>

      <DetailProfileUserView />
    </>
  )
}
