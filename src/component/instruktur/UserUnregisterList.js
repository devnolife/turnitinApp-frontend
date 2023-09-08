
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

import { listUsersInstruktur } from '../api/index'

import { formatDateCalendar, renderUserImgTable } from '@utils'
import { Link } from 'react-router-dom'

const UserUnregisterList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [relod, setRelodData] = useState(false)
  useEffect(async () => {
    await listUsersInstruktur('non_aktif')
      .then((res) => {
        setData(res)
        setRelodData(true)
      })
  }, [relod])

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.nama.toLowerCase().startsWith(value.toLowerCase()) ||
          item.created_at.toLowerCase().startsWith(value.toLowerCase()) ||
          item.prodi.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase())
        const includes =
          item.nama.toLowerCase().includes(value.toLowerCase()) ||
          item.created_at.toLowerCase().includes(value.toLowerCase()) ||
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
      minWidth: '340px',
      sortable: row => row.nama,
      cell: row => (
        <div className='d-flex align-items-center'>
          {renderUserImgTable(row)}
          <div className='user-info text-truncate ms-1'>
            <Link to={`/instruktur/users-detail/${row.id}`}>
              <span className='d-block fw-bold text-truncate'>{row.username}</span>
            </Link>
            <small>{row.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Pendaftaran',
      sortable: true,
      minWidth: '100px',
      selector: row => (
        formatDateCalendar(row.created_at)
      )
    },
    {
      name: 'Prodi',
      sortable: true,
      minWidth: '150px',
      selector: row => row.prodi
    },
    {
      name: 'Status',
      minWidth: '50px',
      sortable: row => row.status_akun,
      cell: () => {
        return (
          <Badge color='light-danger' pill>
            Non Aktif
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
                  to={`/instruktur/users-detail/${row.id}`}
                >
                  <FileText size={15} />
                  <span className='align-middle ms-50'>Detail</span>
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
          <div style={
            {
              height: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'

            }
          }>
            <Spinner
              color='primary'
              style={
                {
                  width: '5rem',
                  height: '5rem'
                }
              } />
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

export default UserUnregisterList
