import { Fragment, useState } from 'react'
import { getUserData } from '@utils'
import { CardText, Button } from 'reactstrap'
import medal from '@src/assets/images/illustration/badge.svg'
import wa from '@src/assets/images/illustration/wa.svg'
import { ArrowLeft, Power } from 'react-feather'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../../@core/auth/jwt/jwtDefaultConfig'
import { handleSuccess } from '../../../component/api/index'

const SendMessage = ({ stepper }) => {
  const dispatch = useDispatch()
  const [link, setLink] = useState('')
  const { turnitin_status, username, status_akun } = getUserData()

  if (turnitin_status === 'false') {
    axios.get(`${baseUrl}/api/whatsapp/send-message-instruktur`)
      .then(res => {
        setLink(res.data)
      })
  }

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Mengirim Pesan WhatsApp</h5>
        <small>Silahkan Melanjutkan Verifikasi Pendaftaran.</small>
      </div>
      {
        status_akun === 'non_aktif' ? (
          <div>
            <h3 className='text-center mb-2 mt-3'>Terima Kasih 🎉 {username}!</h3>
            <CardText className='fw-bold text-center'>Verifikasi Pendaftaran Anda Berhasil <br /> Silahkan tunggu aktivasi notifikasi melalui WhatsApp Anda</CardText>
            <div className='d-flex justify-content-between mt-2'>
              <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
              </Button>
              <Button
                tag={Link}
                to='/login'
                onClick={() => dispatch(handleLogout())}
                color='primary' className='btn-next'>
                <span className='align-middle d-sm-inline-block d-none mr-1'>Keluar</span>
                <Power
                  size={14} className='align-middle ms-sm-25 ms-2'></Power>
              </Button>
            </div>
            <img className='congratulation-medal' src={medal} />
          </div>
        ) : (
          <div className='mt-1'>
            <h3 className='text-center mb-2 mt-3'>{username} akun anda telah diaktifkan 🎉!</h3>
            <CardText className='fw-bold text-center' >Pendaftaran akun Anda Berhasil ! <br /> Silahkan Melanjutkan Proses Turnitin Pesan WhatsApp</CardText>
            <div className='d-flex justify-content-center'>
              <Button
                onClick={() => {
                  handleSuccess()
                  openInNewTab(link)

                }}
                color='success w-50'>Kirim Pesan</Button>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <Button
                tag={Link}
                to='/login'
                onClick={() => dispatch(handleLogout())}
                color='primary'>Keluar</Button>
            </div>
            <img className='congratulation-medal mt-3 ' width='100' src={wa} alt='Medal Pic' />
          </div>

        )
      }
    </Fragment>
  )
}

export default SendMessage
