import { CONFIG } from 'src/config-global'

import { InformationGroupStudentView } from 'src/sections/admin/group-management/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Thông tin nhóm sinh viên - ${CONFIG.appName}`}</title>

      <InformationGroupStudentView />
    </>
  )
}
