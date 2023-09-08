import { baseUrl } from '../../@core/auth/jwt/jwtDefaultConfig'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { X } from 'react-feather'
// import { toast, Slide } from 'react-toastify'


const MySwal = withReactContent(Swal)

// const ToastContentError = ({ message }) => (
//   <Fragment>
//     <div className='toastify-header'>
//       <div className='title-wrapper'>
//         <Avatar size='sm' color='danger' icon={<X size={12} />} />
//         <h6 className='toast-title'>Request Error!</h6>
//       </div>
//     </div>
//     <div className='toastify-body'>
//       <span role='img' aria-label='toast-text'>
//         👋 {message}.
//       </span>
//     </div>
//   </Fragment>
// )

export const nilaiTurnitin = async () => {
  const res = await axios.get(`${baseUrl}/api/user/nilai-turnitin`)
  return res.data.data
}

export const downloadLaporan = async (id, month, year) => {
  await axios.get(`${baseUrl}/api/files/laporan-turnitin/${id}/${month}/${year}`, { responseType: 'blob' })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${month}-${year}.xlsx`)
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      MySwal.fire({
        title: 'Gagal Saat Download , File tidak ditemukan',
        text: `Error :${error.response.data.message}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
}

export const nilaiTurnitinUser = async (id) => {
  const res = await axios.get(`${baseUrl}/api/common/info-nilai/${id}`)
  return res.data
}

export const instrukturDetail = async (id) => {
  const res = await axios.get(`${baseUrl}/api/admin/list-instruktur/${id}`)
  return res.data.data
}

export const instrukturDetailMonthYears = async (id, month, years) => {
  const res = await axios.get(`${baseUrl}/api/admin/list-instruktur/${id}/${month}/${years}`)
  return res.data.data
}

export const timeMonthYearsUsers = async () => {
  const res = await axios.get(`${baseUrl}/api/common/time-users`)
  return res.data
}

export const updateNilai = async (id, data) => {
  const res = await axios.post(`${baseUrl}/api/instruktur/update-nilai/${id}`, data)
  return res.data.data
}

export const infoChat = async () => {
  const res = await axios.get(`${baseUrl}/api/user/check-turnitin`)
  return res.data.data
}

export const infoNilai = async (id) => {
  const res = await axios.get(`${baseUrl}/api/instruktur/info-nilai/${id}`)
  return res.data.data
}

export const deleteFileTurnitin = async (id, params) => {
  const res = await axios.get(`${baseUrl}/api/files/delete-file/${id}/${params}`)
  return res.data.data
}

export const listUsersInstruktur = async (status) => {
  const res = await axios.get(`${baseUrl}/api/instruktur/list-users/${status}`)
  return res.data.data
}

export const detailUserInstruktur = async (id) => {
  const res = await axios.get(`${baseUrl}/api/instruktur/list-users-detail/${id}`)
  return res.data.data
}

export const timeline = async () => {
  const res = await axios.get(`${baseUrl}/api/instruktur/time-line`)
  return res.data.data
}

export const complainMessage = async (data) => {
  const res = await axios.post(`${baseUrl}/api/user/complaint-message`, { message: data })
  return res.data.data
}

export const listInstruktur = async () => {
  const res = await axios.get(`${baseUrl}/api/admin/list-instruktur`)
  return res.data.data
}

export const downloadFile = async (bab) => {
  await axios.get(`${baseUrl}/api/files/download-file/${bab}`)
    .then((response) => {
      console.log(response)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'hasilTurnitin.pdf')
      document.body.appendChild(link)
      link.click()
    })
    .catch((error) => {
      MySwal.fire({
        title: 'Gagal Saat Download , File tidak ditemukan',
        text: `Error :${error.response.data.message}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
}

export const changePassword = async (data) => {
  const res = await axios.post(`${baseUrl}/api/change-password`, data)
  return res.data.data
}

export const sendMessageByAdmin = async (username, message) => {
  const res = await axios.post(`${baseUrl}/api/admin/send-message/${username}`, { message })
  return res.data.data
}
export const pesanLupaPassword = async (data) => {
  const res = await axios.post(`${baseUrl}/api/whatsapp/change-password/${data}`)
  return res.data.data
}

export const profile = async () => {
  const res = await axios.get(`${baseUrl}/api/user/profile`)
  return res.data.data
}
export const dataDashboard = async () => {
  const res = await axios.get(`${baseUrl}/api/admin/dashboard`)
  return res.data.data
}

export const listUserTimeLine = async () => {
  const res = await axios.get(`${baseUrl}/api/admin/time-line`)
  return res.data.data
}

export const addListInstruktur = async (data) => {
  const res = await axios.post(`${baseUrl}/api/admin/create-instruktur`, data)
  return res.data.data
}

export const removeListInstruktur = async (id) => {
  const res = await axios.delete(`${baseUrl}/api/admin/delete-users/${id}`)
  return res.data.data
}

export const infoFileTurn = async (id) => {
  const res = await axios.get(`${baseUrl}/api/files/info-file/${id}`)
  return res.data.data
}

export const listUsers = async (status) => {
  const res = await axios.get(`${baseUrl}/api/admin/list-users/${status}`)
  return res.data.data
}

export const listUsersDetail = async (id) => {
  const res = await axios.get(`${baseUrl}/api/admin/users-detail/${id}`)
  return res.data.data
}

export const userDetail = async () => {
  const res = await axios.get(`${baseUrl}/api/user/detail`)
  return res.data.data
}

export const checkNumberRegister = async (data) => {
  const res = await axios.post(`${baseUrl}/api/whatsapp/check-number`, { no_hp: data })
  return res.data.data
}

export const activateUsers = async (id, status_akun) => {
  const data = {}
  data.id = id
  data.status_akun = status_akun
  console.log(data, 'data')
  const res = await axios.post(`${baseUrl}/api/admin/aktivasi-users`, data)
  return res.data.data
}

export const detailInstruktur = async (id) => {
  const res = await axios.get(`${baseUrl}/api/admin/list-instruktur/${id}`)
  return res.data
}

export const updateStatusUsers = async (data) => {
  const res = await axios.post(`${baseUrl}/api/user/update-user`, data)
  return res.data.data
}

export const sendNotificationsActive = async (username) => {
  const res = await axios.get(`${baseUrl}/api/whatsapp/send-notification/activation/${username}`)
  return res.data
}

export const sendActivationUser = async () => {
  const res = await axios.get(`${baseUrl}/api/whatsapp/send-notification`)
  console.log("🚀 ~ file: index.js:210 ~ sendActivationUser ~ res:", res)
  return res.data
}

export const numberAdmin = async () => {
  const res = await axios.get(`${baseUrl}/api/common/number-admin`)
  return res.data
}

export const sendMessageInstuktur = async () => {
  const res = await axios.get(`${baseUrl}/api/whatsapp/send-message-instruktur`)
  return res.data
}

export const handleWarning = async ({ data }) => {
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

export const handleSuccess = () => {
  updateStatusUsers({ turnitin_status: 'true' })
  return MySwal.fire({
    title: 'Terima Kasih!',
    text: 'Telah mengirim pesan ke Instruktur!',
    icon: 'success',
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false
  })
}

export const handleChatInstruktur = async (data, relodData) => {
  return MySwal.fire({
    title: 'Apakah anda yakin?',
    text: "Anda tidak dapat mengembalikan data yang terhapus !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus data!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false
  }).then(async (result) => {
    if (result.value) {
      await removeListInstruktur(data.id)
        .then(() => {
          MySwal.fire({
            icon: 'success',
            title: 'Terhapus!',
            text: `Instruktur ${data.username} telah terhapus`,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
          relodData()
        })
        .catch(() => {
          return MySwal.fire({
            title: 'Peringatan!',
            text: `Kamu telah menghapus user ${data.username}`,
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          })
        })
    }
  })
}


export const handleDeleteUser = async (data, relodData) => {
  return MySwal.fire({
    title: 'Apakah anda yakin?',
    text: "Anda tidak dapat mengembalikan data yang terhapus !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus data!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false
  }).then(async (result) => {
    if (result.value) {
      await removeListInstruktur(data.id)
        .then(() => {
          MySwal.fire({
            icon: 'success',
            title: 'Terhapus!',
            text: `Instruktur ${data.username} telah terhapus`,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
          relodData()
        })
        .catch(() => {
          return MySwal.fire({
            title: 'Peringatan!',
            text: `Kamu telah menghapus user ${data.username}`,
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          })
        })
    }
  })
}


export const handleActivationUser = async (data, relodData, message) => {
  return MySwal.fire({
    title: 'Apakah anda yakin?',
    text: "Akun yang telah diaktifkan tidak dapat dinonaktifkan !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, aktifkan!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false
  }).then(async (result) => {
    if (result.value) {
      // updateStatusUsers({ turnitin_status: 'true' })
      activateUsers(data.id, 'aktif')
      sendNotificationsActive(data.username)
        .then(() => {
          MySwal.fire({
            icon: 'success',
            title: 'Aktivasi Berhasil!',
            text: `${data.username} diaktifkan`,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
          relodData()
        })
        .catch(() => {
          return MySwal.fire({
            title: 'Peringatan!',
            text: `Kamu telah ${message} user ${data.username}`,
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          })
        })
    }
  })
}
