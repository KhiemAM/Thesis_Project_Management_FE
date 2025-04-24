import { CONFIG } from 'src/config-global'

import { InviteStudentView } from 'src/sections/student/invite-student/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Invite Student - ${CONFIG.appName}`}</title>

      <InviteStudentView />
    </>
  )
}
