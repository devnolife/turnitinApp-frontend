import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import CardUser from '../../component/admin/Card'
import ListUsers from '../../component/admin/ListUser'

const InstrukturDetail = () => {
    return (
        <Fragment>
            <div className='app-user-view'>
                <Row>
                    <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
                        <CardUser />
                    </Col>
                    <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                        <ListUsers />
                    </Col>
                </Row>

            </div>
        </Fragment>
    )
}

export default InstrukturDetail