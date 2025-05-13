import { CONFIG } from 'src/config-global'

import { ListFunctionView } from 'src/sections/admin/function-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Danh sách chức năng - ${CONFIG.appName}`}</title>

      <ListFunctionView />
    </>
  )
}
