import { Fragment, useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardTitle, Modal, ModalBody, ModalHeader } from 'reactstrap'
import ilustrator from '@src/assets/images/illustration/card.gif'
import { sendMessageInstuktur, handleSuccess } from '../api'
const ModalChat = () => {
    const [modal, setModal] = useState(true)
    const [link, setLink] = useState('')

    useEffect(() => {
        sendMessageInstuktur()
            .then(res => {
                setLink(res)
            })
    }, [])

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const handleToggle = () => {
        setModal(!modal)
    }
    return (
        <Fragment>
            <Modal isOpen={modal} toggle={modal} size="lg">
                <ModalBody>
                    <div>
                        <h1 className='text-center mt-1 fw-bolder'>Informasi</h1>
                        <p className='text-center '>Anda belum mengirim pesan ke instruktur</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingLeft: '70px'
                    }}>
                        <img src={ilustrator} alt="illustration" width={500} />
                    </div>
                    <p className='text-center'>Untuk mengirim pesan ke instruktur, silahkan klik tombol Whatsapp dibawah ini</p>
                    <div className='d-flex justify-content-center'>
                        <Button
                            onClick={() => {
                                handleSuccess()
                                openInNewTab(link)
                                handleToggle()
                            }}
                            color='success' className='mb-1'>
                            Whatsapp
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default ModalChat