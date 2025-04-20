import { CONFIG } from 'src/config-global'

import { ProductsView } from 'src/sections/progress/view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Progress - ${CONFIG.appName}`}</title>

      <ProductsView />
    </>
  )
}
