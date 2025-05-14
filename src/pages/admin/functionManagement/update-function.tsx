import { CONFIG } from 'src/config-global'

import { UpdateFunctionView } from 'src/sections/admin/function-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Cập nhật chức năng - ${CONFIG.appName}`}</title>

      <UpdateFunctionView />
    </>
  )
}
