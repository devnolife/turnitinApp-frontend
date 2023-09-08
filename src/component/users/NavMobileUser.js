import { Fragment, useState, useEffect } from 'react'
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap'
import { Link } from 'react-router-dom'
import CardUser from './CardUser'
import CardTurnitin from '../users/CardTurnitin'
import CardPembayaran from '../admin/CardPembayaran'
import DownloadHasil from './DownloadHasil'
import Info from './Info'
import { userDetail } from '../api/index'
import ilustrator from '@src/assets/images/illustration/loading1.gif'

const NavMobile = ({ }) => {
    const [dataUser, setData] = useState([])
    const [dataTurnitin, setDataTurnitin] = useState([])
    const [dataInstruktur, setDataInstruktur] = useState([])
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState('1')

    useEffect(async () => {
        setLoading(true)
        await userDetail()
            .then((res) => {
                setData(res)
                setDataTurnitin(res.tahapUjian)
                setDataInstruktur(res.instruktur)
                setLoading(false)
            })
    }, [])

    const toggle = tab => {
        setActive(tab)
    }

    const Menu = () => {
        return (
            <>
                {
                    dataTurnitin !== null ? (
                        <div>
                            <Nav className='justify-content-end d-md-none gap-1' pills>
                                <NavItem>
                                    <NavLink
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '6px 8px'
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
                                            padding: '6px 8px'
                                        }}
                                        active={active === '2'}
                                        onClick={() => {
                                            toggle('2')
                                        }}
                                    >
                                        Pembayaran
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '6px 8px'
                                        }}
                                        active={active === '3'}
                                        onClick={() => {
                                            toggle('3')
                                        }}
                                    >
                                        Hasil Akhir
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '6px 8px'
                                        }}
                                        active={active === '4'}
                                        onClick={() => {
                                            toggle('4')
                                        }}
                                    >
                                        Informasi
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={active}>
                                <TabPane tabId='1'>
                                    <CardUser />
                                    <CardTurnitin dataUser={dataUser} dataTurnitin={dataTurnitin} dataInstruktur={dataInstruktur} />
                                </TabPane>
                                <TabPane tabId='2'>
                                    <CardPembayaran dataUser={dataUser} />
                                </TabPane>
                                <TabPane tabId='3'>
                                    <DownloadHasil />
                                </TabPane>
                                <TabPane tabId='4'>
                                    <Info />
                                </TabPane>
                            </TabContent>
                        </div>
                    ) : null
                }
            </>
        )
    }
    return (
        <Fragment>
            <div className='d-flex d-lg-none'>
                {
                    loading ? (
                        <div
                            style={{ height: '70vh' }}
                            className='d-flex justify-content-center align-items-center'>
                            <img src={ilustrator} height={350} />
                            <span className=''>Loading . . .</span>
                        </div>
                    ) : (
                        <Menu />
                    )
                }
            </div>
        </Fragment>
    )
}

export default NavMobile