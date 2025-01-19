import { useContext, Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '@src/assets/images/logo/unismuh-logo.svg'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { X, Check, Coffee } from 'react-feather'
import { handleLogin } from '@store/authentication'
import { AbilityContext } from '@src/utility/context/Can'
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'
import { Row, Col, Form, Input, Label, Spinner, Button, CardText, CardTitle, FormFeedback } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'

const ToastContentError = ({ message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<X size={12} />} />
        <h6 className='toast-title'>Request Error!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        👋 {message}.
      </span>
    </div>
  </Fragment>
)

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title fw-bold'>Selamat Datang, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>Kamu telah berhasil login sebagai {role} di Library Unismuh. Enjoy!</span>
    </div>
  </Fragment>
)

const defaultValues = {
  password: '',
  username: ''
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const history = useHistory()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v3.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setLoading(true)
      useJwt
        .login({ username: data.username, password: data.password })
        .then(res => {
          const data = { ...res.data.userData, accessToken: res.data.token, refreshToken: res.data.token }
          dispatch(handleLogin(data))
          setLoading(false)
          ability.update(res.data.userData.ability)
          history.push(getHomeRouteForLoggedInUser(data.role, data.status_akun))
          toast.success(
            <ToastContent name={data.username} role={data.role} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch((err) => {
          if (err?.response) {
            setLoading(false)
            toast.error(
              <ToastContentError message={err.response.data?.message || "Login Error"} />,
              { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          } else {
            setLoading(false)
            toast.error(
              <ToastContentError message={"Server Error"} />,
              { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          }
        })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner '>
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
              Welcome to Library Unismuh! 👋
            </CardTitle>
            <CardText className='mb-2'>Silahkan masuk ke akun anda dan mulailah petualangan</CardText>
            <Form className='aupth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Username/Email/Nim
                </Label>
                <Controller
                  id='username'
                  name='username'
                  control={control}
                  rules={{
                    minLength: 5,
                    required: 'Password tidak boleh kosong !'
                  }}
                  render={({ field }) => (
                    <Input placeholder='username'
                      invalid={errors.username && true} {...field} />
                  )}
                />
                {errors.username ? <FormFeedback>Field tidak boleh kosong !</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Lupa Password?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  rules={{
                    minLength: {
                      value: 8,
                      message: 'Password harus memiliki minimal 8 karakter'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message: 'Password harus mengandung huruf besar, huruf kecil, dan angka'
                    },
                    required: 'Password harus diisi'
                  }}
                  render={({ field }) => (
                    <>
                      <InputPasswordToggle
                        autoFocus
                        className='input-group-merge'
                        invalid={!!errors.password}
                        {...field}
                      />
                      {errors.password && (
                        <FormFeedback>{errors.password.message}</FormFeedback>
                      )}
                    </>
                  )}
                  onChange={() => clearErrors('password')}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Ingat Saya
                </Label>
              </div>
              {
                loading ? (
                  <Button
                    block color='primary'>
                    <Spinner color='white' size='sm' />
                    <span className='ms-50'>Loading...</span>
                  </Button>
                ) : (
                  <Button
                    type='submit' block color='primary'>
                    Masuk
                  </Button>
                )
              }
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Baru Bergabung?</span>
              <Link to='/register'>
                <span>Buat Akun Sekarang</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
