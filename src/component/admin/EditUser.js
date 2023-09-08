import {
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap'

import { Fragment } from 'react'

const EditInstruktur = ({ open, toggleOpen }) => {
    return (
        <Fragment>
            <Modal
                isOpen={open}
                toggle={toggleOpen}
                className='modal-dialog-centered modal-lg'>
                <ModalHeader />
                <ModalBody >
                    <div>
                        <h1>Hai</h1>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default EditInstruktur