import { useRef, useState, useEffect } from 'react'
import logo from '@src/assets/images/logo/unismuh-logo.svg'
import { Link } from 'react-router-dom'
import { Row, Col, Button, CardText, Spinner } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useSkin } from '@hooks/useSkin'
import { FileText, User, FilePlus, Users, ArrowLeft, Power } from 'react-feather'
import Wizard from '@components/wizard'
import Upload from './steps/Upload'
import SendMessage from './steps/SendMessage'
import DataDetail from './steps/DataDetail'
import AccountDetails from './steps/AccountDetails'
import { baseUrl } from '../../@core/auth/jwt/jwtDefaultConfig'
import axios from 'axios'
import { getUserData } from '@utils'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

const ValidationUser = () => {
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)
  const [step, setStep] = useState([])
  const [loading, setLoading] = useState(true) // Add loading state

  const { username } = getUserData()
  const dispatch = useDispatch()

  const steps = [
    {
      no: 1,
      id: 'account-details',
      title: 'Detail Akun',
      subtitle: 'Akun Detail Anda',
      icon: <User size={18} />,
      content: <AccountDetails stepper={stepper} type='modern-vertical' />
    },
    {
      no: 2,
      id: 'personal-info',
      title: 'Informasi Data',
      subtitle: 'Info Data Anda',
      icon: <FileText size={18} />,
      content: <DataDetail AccountDetails stepper={stepper} type='modern-vertical' />
    },
    {
      no: 3,
      id: 'step-Upload',
      title: 'Upload',
      subtitle: 'Upload Data Anda',
      icon: <FilePlus size={18} />,
      content: <Upload stepper={stepper} type='modern-vertical' />
    },
    {
      no: 4,
      id: 'social-links',
      title: 'Kirim Pesan',
      subtitle: 'Mengirim Pesan',
      icon: <Users size={18} />,
      content: <SendMessage stepper={stepper} type='modern-vertical' />
    }
  ]

  useEffect(async () => {
    await axios.get(`${baseUrl}/api/user/validation`)
      .then((res) => {
        console.log(res.data.data)
        setStep(res.data.data)
        setLoading(false) // Set loading to false after data is fetched
      })
  }, [])

  const { skin } = useSkin()
  const illustration = skin === 'dark' ? 'coming-soon-dark.svg' : 'validation-user.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center ' lg='4' sm='12'>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            <img className='' src={logo} alt='logo' height={50} />
            <h2 className='brand-text text-primary ms-1 mt-1'>LIBRARY-UNISMUH</h2>
          </Link>
          <div className='w-70 d-lg-flex align-items-center justify-content-center'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg ' lg='8' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='7' md='7' lg='12'>
            <h2 className='text-center'>Terima kasih telah melakukan pendaftaran 🚀</h2>
            <p className='text-center mb-3'>Untuk melanjutkan verifikasi, Silahkan lengkap data anda terlebih dahulu!</p>
            <div className='modern-vertical-wizard'>
              {
                loading ? ( // Show spinner while loading
                  <div className='text-center'>
                    <Spinner color='primary' />
                  </div>
                ) : step.length !== 0 ? (
                  <Wizard
                    type='modern-vertical'
                    ref={ref}
                    steps={steps.filter((s) => step.includes(s.no))}
                    instance={(el) => setStepper(el)}
                  />
                ) : (
                  <div>
                    <h3 className='text-center mb-2 mt-3'>Terima Kasih 🎉 {username}!</h3>
                    <CardText className='fw-bold text-center'>Verifikasi Pendaftaran Anda Berhasil <br /> Silahkan tunggu aktivasi notifikasi melalui WhatsApp Anda</CardText>
                    <div className='d-flex justify-content-end mt-2'>
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
                  </div>
                )}
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ValidationUser
