import type { SweetAlertIcon } from 'sweetalert2'

export interface AlertConfirmNavigateProps {
  title: string,
  text: string,
  icon: SweetAlertIcon,
  showCancelButton: boolean,
  confirmButtonColor: string,
  cancelButtonColor: string,
  confirmButtonText: string,
  router: () => void
}
