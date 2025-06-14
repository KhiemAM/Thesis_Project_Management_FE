import { CONFIG } from 'src/config-global'

import { InformationGroupStudentView } from 'src/sections/student/list-group-student/view/information-group-student-view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Thông tin nhóm sinh viên - ${CONFIG.appName}`}</title>

      <InformationGroupStudentView />
    </>
  )
}
