import { CONFIG } from 'src/config-global'

import { UpdateTopicProposalView } from 'src/sections/admin/topic-proposal-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Cập nhật đề xuất đề tài - ${CONFIG.appName}`}</title>

      <UpdateTopicProposalView />
    </>
  )
}
