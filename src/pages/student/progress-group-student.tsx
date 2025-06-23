import { CONFIG } from 'src/config-global'

import { ProgressGroupStudentView } from 'src/sections/student/list-group-student/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Quản lý tiến độ nhóm - ${CONFIG.appName}`}</title>

      <ProgressGroupStudentView />
    </>
  )
}
