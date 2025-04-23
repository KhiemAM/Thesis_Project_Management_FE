import { CONFIG } from 'src/config-global'

import { SearchStudentView } from 'src/sections/student/search-student/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Search Student - ${CONFIG.appName}`}</title>

      <SearchStudentView />
    </>
  )
}
