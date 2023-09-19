
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

import {
  listProdi,
  changeStatusProdi
} from '../api'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ListProdi = () => {
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

  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [relod, setRelodData] = useState(false)
  useEffect(async () => {
    await listProdi()
      .then((res) => {
        setData(res)
        setRelodData(true)
      })
  }, [relod])

  const ChangeStatus = async (e, id, status) => {
    e.preventDefault()
    try {
      const respon = await changeStatusProdi(id, status)
      if (respon) {
        AlertFunction('Berhasil', 'Status berhasil diubah', 'success', 'btn btn-primary')
        setRelodData(false)
      }
    } catch (err) {
      AlertFunction('Gagal', 'Status gagal diubah', 'error', 'btn btn-primary')
      setRelodData(false)
    }
  }
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.prodi.toLowerCase().startsWith(value.toLowerCase()) ||

          item.fakultas.toLowerCase().startsWith(value.toLowerCase()) ||
          item.has_bab_results.toLowerCase().startsWith(value.toLowerCase())
        const includes =
          item.prodi.toLowerCase().includes(value.toLowerCase()) ||

          item.fakultas.toLowerCase().includes(value.toLowerCase()) ||
          item.has_bab_results.toLowerCase().includes(value.toLowerCase())

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
      name: 'Prodi',
      sortable: true,
      minWidth: '250px',
      selector: row => row.prodi
    },
    {
      name: 'Fakultas',
      minWidth: '300px',
      selector: row => row.fakultas
    },
    {
      name: 'Biaya Turnitin',
      minWidth: '70px',
      selector: row => row.biaya
    },
    {
      name: 'Strata',
      minWidth: '50px',
      selector: row => row.kode_strata
    },
    {
      name: 'Status',
      minWidth: '50px',
      sortable: row => row.has_bab_results,
      cell: (row) => {
        return (
          row.has_bab_results === "true" ? <Badge color='light-success' pill> Aktif </Badge> : <Badge color='light-danger' pill> Tidak Aktif </Badge>
        )
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        const status = row.has_bab_results === "true" ? "false" : "true"
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pe-1' tag='span'>
                <MoreVertical size={15} />
                <DropdownMenu container="body">
                  <DropdownItem className='w-100'
                    onClick={
                      (e) => {
                        ChangeStatus(e, row.id, status)
                      }}>
                    <Edit size={15} />
                    {
                      row.has_bab_results === "true" ? " Non Aktifkan" : " Aktifkan"
                    }
                  </DropdownItem>
                </DropdownMenu>
              </DropdownToggle>
            </UncontrolledDropdown>
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
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 10) : Math.ceil(data.length / 10) || 1}
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
                paginationPerPage={10}
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

export default ListProdi
