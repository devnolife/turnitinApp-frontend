
import { useState, useEffect, Fragment } from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

import { ChevronDown, MoreVertical, FileText, Archive, Trash, Edit } from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner
} from 'reactstrap'

import { listUsers, handleDeleteUser } from '../api/index'

import { renderUserImgTable } from '@utils'
import { Link } from 'react-router-dom'


const UserAktifList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [relod, setRelodData] = useState(false)
  useEffect(async () => {
    await listUsers('aktif')
      .then((res) => {
        setData(res)
        setRelodData(true)
      })
  }, [relod])

  const relodData = () => setRelodData(false)
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.nama.toLowerCase().startsWith(value.toLowerCase()) ||

          item.prodi.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase())
        const includes =
          item.nama.toLowerCase().includes(value.toLowerCase()) ||

          item.prodi.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  const columns = [
    {
      name: 'Nama',
      minWidth: '330px',
      sortable: row => row.nama,
      cell: row => (
        <div className='d-flex align-items-center'>
          {renderUserImgTable(row)}
          <div className='user-info text-truncate ms-1'>
            <Link to={`/admin/users/detail/${row.id}`}>
              <span className='d-block fw-bold text-truncate'>{row.username}</span>
            </Link>
            <small>{row.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Prodi',
      sortable: true,
      minWidth: '250px',
      selector: row => row.prodi
    },
    {
      name: 'Status',
      minWidth: '50px',
      sortable: row => row.status_akun,
      cell: () => {
        return (
          <Badge color='light-success' pill>
            Aktif
          </Badge>
        )
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pe-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem
                  tag={Link}
                  className='w-100'
                  to={`/admin/users/detail/${row.id}`}
                >
                  <FileText size={15} />
                  <span className='align-middle ms-50'>Detail</span>
                </DropdownItem>
                <DropdownItem className='w-100'
                  onClick={
                    () => {
                      handleDeleteUser(row, relodData)
                        .then(() => {
                          relodData()
                        })
                    }}>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>Hapus</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Edit size={15} />
          </div>
        )
      }
    }
  ]

  const handlePagination = page => {
    setCurrentPage(page.selected)
  }
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

  return (
    <Fragment>
      {
        relod === false ? (
          <div style={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'

          }}>
            <Spinner
              style={
                {
                  width: '5rem',
                  height: '5rem'
                }
              }
              color='primary' />
          </div>
        ) : (
          <Card>
            <Row className='justify-content-end mx-0'>
              <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                <Label className='me-1' for='search-input'>
                  Search
                </Label>
                <Input
                  className='dataTable-filter mb-50'
                  type='text'
                  bsSize='sm'
                  id='search-input'
                  value={searchValue}
                  onChange={handleFilter}
                />
              </Col>
            </Row>
            <div className='react-dataTable'>
              <DataTable
                noHeader
                pagination
                columns={columns}
                paginationPerPage={7}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                paginationComponent={CustomPagination}
                data={searchValue.length ? filteredData : data}
              />
            </div>
          </Card>

        )
      }
    </Fragment>
  )
}

export default UserAktifList
