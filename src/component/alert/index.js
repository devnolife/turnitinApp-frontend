import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const handleWarning = ({ data }) => {
    const { username, message } = data
    return MySwal.fire({
        title: 'Peringatan!',
        text: `Kamu telah ${message} user ${username}`,
        icon: 'warning',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}

export const handleDelete = () => {
    return MySwal.fire({
        title: 'Are you sure?',
        text: "Anda tidak dapat mengembalikan data yang terhapus !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus data!',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
    }).then(function (result) {
        if (result.value) {
            MySwal.fire({
                icon: 'success',
                title: 'Terhapus!',
                text: 'Your file has been deleted.',
                customClass: {
                    confirmButton: 'btn btn-success'
                }
            })
        }
    })
}

export const handleConfirmText = () => {
    return MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
    }).then(function (result) {
        if (result.value) {
            MySwal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                customClass: {
                    confirmButton: 'btn btn-success'
                }
            })
        }
    })
}


