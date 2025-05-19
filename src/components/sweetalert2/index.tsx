import Swal from 'sweetalert2'

import type { AlertConfirmNavigateProps, AlertConfirmCallAPIProps } from './types'

export const AlertConfirmNavigate = ({
  title,
  text,
  icon,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText,
  router
} : AlertConfirmNavigateProps) => (
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText
  }).then((result) => {
    if (result.isConfirmed) {
      router()
    }
  })
)

export const AlertConfirmCallAPI = ({
  title,
  text,
  icon,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText,
  cancelButtonText,
  api
} : AlertConfirmCallAPIProps) => (
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText
  }).then((result) => {
    if (result.isConfirmed) {
      api()
    }
  })
)