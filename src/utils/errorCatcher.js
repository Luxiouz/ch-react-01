import Swal from "sweetalert2";

export default function errorCatcher(error) {
    return (
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: '<a href="">Desea reportar el error?</a>'
          })
    )
}
