import { CONFIG } from 'src/config-global'

import { ListGroupStudentView } from 'src/sections/student/list-group-student/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Danh sách nhóm sinh viên - ${CONFIG.appName}`}</title>

      <ListGroupStudentView />
    </>
  )
}
