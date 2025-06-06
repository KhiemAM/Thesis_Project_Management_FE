import { CONFIG } from 'src/config-global'

import { AnnounceTopicView } from 'src/sections/admin/topic-proposal-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Danh sách đề tài - ${CONFIG.appName}`}</title>

      <AnnounceTopicView />
    </>
  )
}
