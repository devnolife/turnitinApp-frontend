import { Fragment, useState, useEffect } from 'react'
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap'
import { Link } from 'react-router-dom'
import CardInfo from './CardInfo'
import Timeline from './UserTimeline'
import { timeline } from '../../component/api'
const NavMobile = () => {
    const [active, setActive] = useState('1')
    const [data, setData] = useState([])
    const toggle = tab => {
        setActive(tab)
    }

    useEffect(() => {
        timeline().then(res => {
            setData(res)
        })
    }, [])
    return (
        <Fragment>
            <Nav className='justify-content-end d-md-none gap-1' pills>
                <NavItem>
                    <NavLink
                        style={{
                            fontSize: '0.8rem',
                            padding: '6px 10px'
                        }}
                        active={active === '1'}
                        onClick={() => {
                            toggle('1')
                        }}
                    >
                        Dashboard
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={{
                            fontSize: '0.8rem',
                            padding: '6px 10px'
                        }}
                        active={active === '2'}
                        onClick={() => {
                            toggle('2')
                        }}
                    >
                        Users
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId='1'>
                    <CardInfo />
                </TabPane>
                <TabPane tabId='2'>
                    <Timeline
                        data={data}
                    />
                </TabPane>
            </TabContent>
        </Fragment >
    )
}

export default NavMobile