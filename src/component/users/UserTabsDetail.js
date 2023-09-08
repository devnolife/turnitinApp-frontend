import { Fragment, useState, useEffect } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Spinner } from 'reactstrap'
import { User, Lock, Bookmark, MessageCircle } from 'react-feather'
import CardTurnitin from '../users/CardTurnitin'
import CardPembayaran from '../admin/CardPembayaran'
import DownloadHasil from './DownloadHasil'
import Info from './Info'
import { userDetail } from '../api/index'
import ilustrator from '@src/assets/images/illustration/loading1.gif'

const UserTabsDetail = ({ active, toggleTab }) => {
  const [dataUser, setData] = useState([])
  const [dataTurnitin, setDataTurnitin] = useState([])
  const [dataInstruktur, setDataInstruktur] = useState([])
  const [loading, setLoading] = useState(true)
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

  const Menu = () => {
    return (
      <>
        {
          dataTurnitin !== null ? (
            <div>
              <Nav pills className='mb-2'>
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <User className='font-medium-3 me-50' />
                    <span className='fw-bold'>Turnitin</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <Lock className='font-medium-3 me-50' />
                    <span className='fw-bold'>Pembayaran</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                    <Bookmark className='font-medium-3 me-50' />
                    <span className='fw-bold'>Hasil Akhir</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                    <MessageCircle className='font-medium-3 me-50' />
                    <span className='fw-bold'>Informasi</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={active}>
                <TabPane tabId='1'>
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
          ) : (
            <Card>
              <CardBody>
                <h4 className='fw-bolder border-bottom pb-50 mb-1 text-center'>Data Detail</h4>
                <div className='d-flex align-items-center'>
                  <h1>yukkk isi data yukk maniss</h1>
                  <img src={ilustrator} height={450} />
                </div>
              </CardBody>
            </Card>
          )
        }
      </>
    )
  }
  return (
    <Fragment>
      {
        loading ? (
          <div
            style={{ height: '70vh' }}
            className='d-flex justify-content-center align-items-center'>
            <img src={ilustrator} height={350} />
            {/* <span className=''>Loading . . .</span> */}
          </div>
        ) : (
          <Menu />
        )
      }

    </Fragment>
  )
}
export default UserTabsDetail
