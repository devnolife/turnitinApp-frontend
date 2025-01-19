// ** React Imports
import { Link } from 'react-router-dom'
import logo from '@src/assets/images/logo/unismuh-logo.svg'
// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Styles
import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === 'dark' ? 'not-authorized-dark.svg' : 'not-authorized.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  return (
    <div className='misc-wrapper'>
      <Link className='brand-logo' to='/'>
        <img className='' src={logo} alt='logo' height={50} />
        <h2 className='brand-text text-primary ms-1'>Perpus Unismuh</h2>
      </Link>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Terjadi Sebauh Kesalahan! 🔐</h2>
          <p className='mb-2'>
            Silahkan kembali home terlebih dahulu.
          </p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-1'>
            Back to Login
          </Button>
          <img className='img-fluid' src={source} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
