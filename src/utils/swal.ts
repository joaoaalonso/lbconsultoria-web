import Swal, { SweetAlertIcon } from 'sweetalert2'

type ConfirmOptions = {
  title?: string
  text?: string
  icon?: string
  // dangerMode and buttons are accepted but ignored — sweetalert2 uses confirmButtonColor instead
  dangerMode?: boolean
  buttons?: unknown
}

// Overload 1: simple alert — swal('', message, 'success')
function swal(title: string, text?: string, icon?: string): Promise<void>
// Overload 2: confirmation dialog — swal({ title, text, icon, buttons, dangerMode })
function swal(options: ConfirmOptions): Promise<boolean>

function swal(
  titleOrOptions: string | ConfirmOptions,
  text?: string,
  icon?: string,
): Promise<void | boolean> {
  if (typeof titleOrOptions === 'object') {
    const { title, text, icon } = titleOrOptions
    return Swal.fire({
      title,
      text,
      icon: icon as SweetAlertIcon | undefined,
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#ff19d5',
      cancelButtonColor: '#f1f2f5',
    }).then(({ isConfirmed }) => isConfirmed)
  }

  return Swal.fire({
    title: titleOrOptions || undefined,
    text,
    icon: icon as SweetAlertIcon | undefined,
  }).then(() => undefined)
}

export default swal
