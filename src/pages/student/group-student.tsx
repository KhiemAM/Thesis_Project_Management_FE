import { CONFIG } from 'src/config-global'

import { GroupStudentView } from 'src/sections/student/group-student/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Group Student - ${CONFIG.appName}`}</title>

      <GroupStudentView />
    </>
  )
}
