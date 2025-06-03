import { CONFIG } from 'src/config-global'

import { ImportTopicProposalView } from 'src/sections/admin/topic-proposal-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Import đề xuất đề tài - ${CONFIG.appName}`}</title>

      <ImportTopicProposalView />
    </>
  )
}
