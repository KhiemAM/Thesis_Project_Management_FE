import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router'

import { store } from 'src/redux/stores.js'

import App from './app'
import LoadingProvider from './context'
import { routesSection } from './routes/sections'
import { ErrorBoundary } from './routes/components'

const persistor = persistStore(store)
// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection
  }
])

const root = createRoot(document.getElementById('root')!)

root.render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <LoadingProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-left" theme="colored"/>
      </LoadingProvider>
    </PersistGate>
  </Provider>
  // </StrictMode>
)
