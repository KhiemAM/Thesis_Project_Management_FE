import { CONFIG } from 'src/config-global'

import { ListTopicProposalView } from 'src/sections/admin/topic-proposal-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Danh sách đề xuất đề tài - ${CONFIG.appName}`}</title>

      <ListTopicProposalView />
    </>
  )
}
