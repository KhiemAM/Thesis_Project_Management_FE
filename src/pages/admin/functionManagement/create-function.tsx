import { CONFIG } from 'src/config-global'

import { CreateFunctionView } from 'src/sections/admin/function-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Thêm chức năng mới - ${CONFIG.appName}`}</title>

      <CreateFunctionView />
    </>
  )
}
