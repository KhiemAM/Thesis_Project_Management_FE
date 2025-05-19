import { CONFIG } from 'src/config-global'

import { ApproveTopicProposalView } from 'src/sections/admin/topic-proposal-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Duyệt đề tài - ${CONFIG.appName}`}</title>

      <ApproveTopicProposalView />
    </>
  )
}
