import { CONFIG } from 'src/config-global'

import { ListCommitteeView } from 'src/sections/admin/committee-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Danh sách hội đồng - ${CONFIG.appName}`}</title>

      <ListCommitteeView />
    </>
  )
}
