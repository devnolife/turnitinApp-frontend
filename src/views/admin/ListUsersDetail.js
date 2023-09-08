import { Fragment, useState } from 'react'
import { List } from 'react-feather'
import CardUsers from '../../component/admin/CardUsers'
import UserTabsDetail from '../../component/admin/UserTabsDetail'
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import { useParams } from 'react-router-dom'
import BreadCrumbs from '../../component/common/BreadCrumbs'
const ListUsersDetail = () => {
    const { id } = useParams()
    const [active, setActive] = useState('1')

    const toggleTab = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle='User Detail'
                breadCrumbParent='Users'
                breadCrumbActive='User Detail'
                link={'/admin/users'}
                name={'Users'}
            />
            <Row className='match-height'>
                <Col lg='4' xs='12'>
                    <Card>
                        <CardBody className='d-flex align-items-center justify-content-center'>
                            <CardUsers userID={id} />
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                    <UserTabsDetail
                        userID={id}
                        active={active}
                        toggleTab={toggleTab} />
                </Col>
            </Row>
        </Fragment>
    )
}

export default ListUsersDetail