import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Input } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { listHargaTurnitin, editHargaTurnitin } from '../api'

const MySwal = withReactContent(Swal)

const AlertFunction = (judul, tes, ikon, tombol) => {
    return MySwal.fire({
        title: judul,
        text: tes,
        icon: ikon,
        customClass: {
            confirmButton: tombol
        },
        buttonsStyling: false
    })
}

const DaftarHargaTurnitin = () => {
    const [listHarga, setListHarga] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editedHarga, setEditedHarga] = useState(50000)

    useEffect(() => {
        const fetchData = async () => {
            const res = await listHargaTurnitin()
            setListHarga(res)
        }
        fetchData()
    }, [])

    const handleEditClick = (id, harga) => {
        setEditingId(id)
        setEditedHarga(harga)
    }

    const handleSaveClick = async (id) => {
        if (parseInt(editedHarga.replace(/\D/g, ''), 10) < 50000) {
            AlertFunction('Gagal', 'Harga tidak boleh kurang dari Rp 50.000', 'error', 'btn btn-primary')
        } else {
            try {
                await editHargaTurnitin(id, editedHarga)
                AlertFunction('Berhasil', 'Harga Turnitin berhasil diubah', 'success', 'btn btn-primary')
                const updatedList = listHarga.map((item) => {
                    if (item.id === id) {
                        return { ...item, biaya: editedHarga }
                    }
                    return item
                })
                setListHarga(updatedList)
                setEditingId(null)
            } catch (error) {
                AlertFunction('Gagal', 'Terjadi kesalahan saat mengedit harga Turnitin', 'error', 'btn btn-primary')
            }
        }
    }

    return (
        <Card>
            <Table striped>
                <thead>
                    <tr>
                        <th>Turnitin</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {listHarga.map((item) => (
                        <tr key={item.id}>
                            <td>{item.kode_strata}</td>
                            <td>
                                {editingId === item.id ? (
                                    <Input
                                        type="text"
                                        value={editedHarga}
                                        onChange={(e) => setEditedHarga(e.target.value)}
                                    />
                                ) : (
                                    item.biaya
                                )}
                            </td>
                            <td>
                                {editingId === item.id ? (
                                    <div className="justify-content-between">
                                        <Button color="primary" onClick={() => handleSaveClick(item.id)}>
                                            Simpan
                                        </Button>
                                        <Button color="danger" onClick={() => setEditingId(null)}>
                                            Batal
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        color="primary"
                                        onClick={() => handleEditClick(item.id, item.biaya)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    )
}

export default DaftarHargaTurnitin
