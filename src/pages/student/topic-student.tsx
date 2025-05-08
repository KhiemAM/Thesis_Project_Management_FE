import { CONFIG } from 'src/config-global'

import { TopicStudentView } from 'src/sections/student/topic-student/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Search Student - ${CONFIG.appName}`}</title>

      <TopicStudentView />
    </>
  )
}
