import React from 'react'
import ListProdi from '../../component/admin/ListProdi'
import DaftarHargaTurnitin from '../../component/admin/DaftarHargaTurnitin'
import { Card, CardHeader } from 'reactstrap'

const Setting = () => {
  return (
    <>
    <div>
    <Card>
      <CardHeader>
        <h4 className='card-title'>Daftar Program Studi</h4>
        </CardHeader>
      <ListProdi />
    </Card>
    <Card>
      <CardHeader>
        <h4 className='card-title'>Daftar Harga Turnitin</h4>
        </CardHeader>
      <DaftarHargaTurnitin />
    </Card>
    </div>
    </>
  )
}

export default Setting