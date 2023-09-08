import { Fragment } from 'react'
import { getUserData } from '@utils'
import { CardText, Button } from 'reactstrap'
import medal from '@src/assets/images/illustration/badge.svg'
import { ArrowLeft, Power } from 'react-feather'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'
import { Link } from 'react-router-dom'
const SendMessage = ({ stepper }) => {
  const dispatch = useDispatch()
  const { username } = getUserData()
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Mengirim Pesan WhatsApp</h5>
        <small>Silahkan Melanjutkan Verifikasi Pendaftaran.</small>
      </div>
      <div>
        <h3 className='text-center mb-2 mt-3'>Terima Kasih 🎉 {username}!</h3>
        <CardText className='fw-bold text-center'>Verifikasi Pendaftaran Anda Berhasil <br /> Silahkan tunggu aktivasi notifikasi melalui WhatsApp Anda</CardText>
        <div className='d-flex justify-content-between mt-2'>
          {
            stepper?._steps.length > 1 ? (
              <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Kembali.</span>
              </Button>
            ) : null
          }
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
    </Fragment>
  )
}

export default SendMessage
