import { Fragment } from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'
const CardInfo = () => {
    return (
        <Fragment>
            <Card>
                <CardBody>
                    <CardTitle tag='h5'>Card title</CardTitle>
                    <CardText>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CardText>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default CardInfo