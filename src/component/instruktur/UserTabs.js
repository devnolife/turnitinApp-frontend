import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { User, Lock, Bookmark } from 'react-feather'

import UserUnregisterList from './UserUnregisterList'
import UserAktifList from './UserAktif'
import UserListLulus from './UserLulus'
const UserTabs = ({ active, toggleTab }) => {

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Pendaftar</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Aktif</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>Lulus</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserUnregisterList />
        </TabPane>
        <TabPane tabId='2'>
          <UserAktifList />
        </TabPane>
        <TabPane tabId='3'>
          <UserListLulus />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
