import { CONFIG } from 'src/config-global'

import { ApproveFacultyTopicProposalView } from 'src/sections/admin/topic-proposal-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Duyệt đề tài cấp khoa - ${CONFIG.appName}`}</title>

      <ApproveFacultyTopicProposalView />
    </>
  )
}
