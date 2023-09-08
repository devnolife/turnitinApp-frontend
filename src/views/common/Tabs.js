// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Fragment } from "react"
// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell } from 'react-feather'

const Tabs = ({ activeTab, toggleTab, role }) => {
  return (
    <Fragment>
      {
        role === 'user' ? (
          <Nav pills className='mb-2'>
            <NavItem>
              <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
                <User size={18} className='me-50' />
                <span className='fw-bold'>Akun</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
                <Lock size={18} className='me-50' />
                <span className='fw-bold'>Data Pembayaran</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
                <Bookmark size={18} className='me-50' />
                <span className='fw-bold'>Data Turnitin</span>
              </NavLink>
            </NavItem>
          </Nav>
        ) : null
      }
    </Fragment>
  )
}

export default Tabs
