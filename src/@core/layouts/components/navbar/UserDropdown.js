import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Avatar from '@components/avatar'
import { isUserLoggedIn } from '@utils'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Spinner } from 'reactstrap'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { profile } from '../../../../component/api'


const UserDropdown = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setLoading(true)
      profile()
        .then((res) => {
          setUserData(res)
          setLoading(false)
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(handleLogout())
            history.push('/login')
          }
        })
    }
  }, [])


  const userAvatar = (userData && userData.imageProfile) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['username'])}</span>
          <span className='user-status'>{(userData && userData.role)}</span>
        </div>
        {
          loading ? (
            < Spinner type='grow' color='primary' />
          ) : (
            <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
          )
        }
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
