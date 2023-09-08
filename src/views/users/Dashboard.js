import {
    Fragment, useState, useEffect
} from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from 'reactstrap'
import CardUsers from '../../component/users/CardUser.js'
import UserTabsDetail from '../../component/users/UserTabsDetail'
import Navbar from '../../component/users/NavMobileUser'
import ModalChat from '../../component/users/ModalChat.js'
import { infoChat } from '../../component/api'
// import Breadcrumbs from '../../component/common/Breadcrumbs'


const Dashboard = () => {
    const [active, setActive] = useState('1')
    const toggleTab = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const [turnitin_status, setTurnitinStatus] = useState('false')
    useEffect(async () => {
        await infoChat()
            .then((res) => {
                setTurnitinStatus(res.turnitin_status)
            })
    }, [])

    return (
        <Fragment>
            <Navbar />
            {
                turnitin_status === 'false' ? <ModalChat /> : ''
            }
            <Row>
                <Col lg='4' xs='12' className='d-sm-none d-lg-block'>
                    <CardUsers />
                </Col>
                <Col xl='8' lg='7' className='d-sm-none d-lg-block'>
                    <UserTabsDetail
                        active={active}
                        toggleTab={toggleTab} />
                </Col>
            </Row >
        </Fragment >
    )
}

export default Dashboard