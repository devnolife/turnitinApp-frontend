import { Fragment, useState } from 'react'
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'
import { Navbar, Nav, NavLink, NavItem, Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

const NavMobile = ({ }) => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
        setActive(tab)
    }
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
                        Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={{
                            fontSize: '0.8rem',
                            padding: '6px 10px'
                        }}
                        active={active === '3'}
                        onClick={() => {
                            toggle('3')
                        }}
                    >
                        About
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={{
                            fontSize: '0.8rem',
                            padding: '6px 10px'
                        }}
                        active={active === '4'}
                        onClick={() => {
                            toggle('4')
                        }}
                    >
                        Whatsapp
                    </NavLink>
                </NavItem>
            </Nav>
        </Fragment >
    )
}

export default NavMobile