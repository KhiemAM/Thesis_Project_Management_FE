import { CONFIG } from 'src/config-global'

import { CreateCommitteeView } from 'src/sections/admin/committee-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Lập hội đồng - ${CONFIG.appName}`}</title>

      <CreateCommitteeView />
    </>
  )
}
