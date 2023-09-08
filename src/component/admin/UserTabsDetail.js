import { Fragment, useState, useEffect } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'
import ilustrator from '@src/assets/images/illustration/not-found.gif'
import spinner from '@src/assets/images/illustration/spinner.gif'
import CardTurnitin from './CardTurnitin'
import CardPembayaran from './CardPembayaran'
import CardLulus from './CardUserLulus'
import ChartNilai from './ChartNilai'
import { listUsersDetail } from '../api/index'

const UserTabsDetail = ({ active, toggleTab, userID }) => {
  const [dataUser, setData] = useState([])
  const [dataTurnitin, setDataTurnitin] = useState([])
  const [dataInstruktur, setDataInstruktur] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    setLoading(true)
    await listUsersDetail(userID)
      .then((res) => {
        setData(res)
        setDataTurnitin(res.tahapUjian)
        setDataInstruktur(res.instruktur)
        setLoading(false)
      })
  }, [])

  const RenderContent = () => {
    return (
      <>
        {
          dataTurnitin !== null ? (
            <div>
              <Nav pills className='mb-2'>
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <User className='font-medium-3 me-50' />
                    <span className='fw-bold'>Data Turnitin</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <Lock className='font-medium-3 me-50' />
                    <span className='fw-bold'>Data Pembayaran</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                    <Bookmark className='font-medium-3 me-50' />
                    <span className='fw-bold'>Progress Turnitin</span>
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
                  <ChartNilai id={dataUser.id} />
                </TabPane>
              </TabContent>
            </div>
          ) : (
            <Card>
              <CardBody>
                <h4 className='fw-bolder border-bottom pb-50 mb-1 text-center'>Data Detail</h4>
                <div
                  style={{
                    height: '65vh'
                  }}
                  className='d-flex align-items-center justify-content-center'>
                  <img src={ilustrator} height={300} />
                </div>
                <h4 className='text-center'>{`${dataUser.username} Belum Memperlengkap Data`}</h4>
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
          <Card>
            <CardBody>
              <h4 className='fw-bolder border-bottom pb-50 mb-1 text-center'>Data Detail</h4>
              <div
                style={{
                  height: '65vh'
                }}
                className='d-flex align-items-center justify-content-center'>
                <img src={spinner} height={70} />
              </div>
            </CardBody>
          </Card>
        ) : (
          <RenderContent />
        )
      }
    </Fragment>
  )
}
export default UserTabsDetail
