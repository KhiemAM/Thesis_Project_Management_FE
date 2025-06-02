import axios from 'axios'
import { toast } from 'react-toastify'

import { logoutUserAPI } from 'src/redux/user/user-slice'

import authApi from './auth'

let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

const authorizedAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
    'Cache-Control': 'no-cache'
  }
})

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.interceptors.request.use((config) =>
  config
, (error) => Promise.reject(error))

//Axios interceptor refresh token
let refreshTokenPromise = null

authorizedAxiosInstance.interceptors.response.use((response) =>
  response
, (error) => {

  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI({ showSuccessMessage: false }))
  }

  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true

    if (!refreshTokenPromise) {
      const state = axiosReduxStore.getState()
      refreshTokenPromise = authApi.refreshToken(state.user.currentUser.refresh_token)
        .then(data => data?.access_token)
        .catch((err) => {
          axiosReduxStore.dispatch(logoutUserAPI({ showSuccessMessage: false }))
          return Promise.reject(err)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
    }

    return refreshTokenPromise.then((accessToken) => authorizedAxiosInstance(originalRequests))
  }

  let errorMessage = error?.message
  if (error.response?.data?.detail) {
    errorMessage = error.response.data.detail
  }
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})

export default authorizedAxiosInstance