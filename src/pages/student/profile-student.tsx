import { CONFIG } from 'src/config-global'

import { ProfileStudentView } from 'src/sections/student/profile-student/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Profile Student - ${CONFIG.appName}`}</title>

      <ProfileStudentView />
    </>
  )
}
