import Swal from 'sweetalert2'

import type { AlertConfirmNavigateProps } from './types'

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