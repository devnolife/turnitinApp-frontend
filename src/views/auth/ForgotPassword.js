import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, Spinner } from 'reactstrap'
import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import '@styles/react/pages/page-authentication.scss'
import logo from '@src/assets/images/logo/unismuh-logo.svg'
import { pesanLupaPassword } from '../../component/api'
import { ToastSuccees, ToastError } from '../../component/auth/toast'
import { toast, Slide } from 'react-toastify'
const ForgotPassword = () => {

  const [loading, setLoading] = useState(false)
  const { skin } = useSkin()
  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    const data = {
      username: e.target.username.value
    }
    pesanLupaPassword(data.username)
      .then(() => {
        setLoading(false)
        toast.success(
          <ToastSuccees message='Notifikasi Berhasil Dikirim' />,
          { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .catch((err) => {
        setLoading(false)
        toast.error(
          <ToastError message={err.response.data.message} />,
          { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
  }
  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-cover'>
        <Row className='auth-inner m-0'>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            <img className='' src={logo} alt='logo' height={50} />
            <h2 className='brand-text text-primary ms-1 mt-1'>LIBRARY-UNISMUH</h2>
          </Link>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login Cover' />
            </div>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='fw-bold mb-1'>
                Lupa Password? 🔒
              </CardTitle>
              <CardText className='mb-2'>
                Masukkan username atau email Anda dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda melalui Whatsapp
              </CardText>
              <Form className='auth-forgot-password-form mt-2' onSubmit={onSubmit}>
                <div className='mb-1'>
                  <Label className='form-label' for='username'>
                    Username atau Email
                  </Label>
                  <Input type='username' id='username' placeholder='username atau email' autoFocus />
                </div>
                {
                  loading ? (
                    <Button
                      type='submit' block color='primary'>
                      <Spinner color='white' size='sm' />
                      <span className='ms-50'>Loading...</span>
                    </Button>
                  ) : (
                    <Button color='primary' block>
                      Kirim Pesan
                    </Button>

                  )
                }
              </Form>
              <p className='text-center mt-2'>
                <Link to='/login'>
                  <ChevronLeft className='rotate-rtl me-25' size={14} />
                  <span className='align-middle'>Kembali</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default ForgotPassword
