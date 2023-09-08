import { MoreVertical, Edit, Trash, FileText, CheckCircle, Lock } from "react-feather"
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Spinner
} from "reactstrap"
import Avatar from '@components/avatar'
import { useState, useEffect, Fragment } from "react"
import {
  listInstruktur,
  activateUsers,
  handleWarning,
  handleDeleteUser
} from "../api/index"
import { useHistory } from 'react-router-dom'
import Sidebar from './AddInstruktur'

import ilustrator from '@src/assets/images/illustration/loading1.gif'
const renderUserImg = (item) => {
  if (item.imageProfile !== null && item.imageProfile.length) {
    return (
      <img
        height='43px'
        width='44px'
        alt='user-avatar'
        src={item.imageProfile}
        className='rounded-circle me-1'
      />
    )
  } else {
    const stateNum = Math.floor(Math.random() * 6),
      states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
      color = states[stateNum]
    return (
      <Avatar
        initials
        color={color}
        className='rounded-circle me-1'
        content={item.username}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(23px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          height: '42px',
          width: '42px'
        }}
      />
    )
  }

}

const Rendertable = ({ data, relodData, history }) => {
  return data.map((item, index) => {
    return (
      <tbody key={index}>
        <tr >
          <td>
            {renderUserImg(item)}
            <span className="align-middle fw-bold mr-2">{item.username}</span>
          </td>
          <td>{item.email}</td>
          <td>
            <td className="d-flex justify-content-between m">
              {item.jumlahUsers}</td>
          </td>
          <td>
            {
              item.status_akun === "aktif" ? (
                <Badge color="light-success" className="me-1" >Aktif</Badge>
              ) : (
                <Badge color="light-danger" className="me-1" >Non Aktif</Badge>
              )
            }
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle
                className="icon-btn hide-arrow"
                color="transparent"
                size="sm"
                caret
              >
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                {
                  item.status_akun === "aktif" ? (
                    <DropdownItem onClick={
                      () => {
                        activateUsers(item.id, "non_aktif")
                        handleWarning({ data: { username: item.username, message: "menonaktifkan" } })
                        relodData()
                      }
                    }>
                      <Lock className="me-50" size={15} />{" "}
                      <span className="align-middle">Nonaktifkan</span>
                    </DropdownItem>
                  ) : (
                    <DropdownItem onClick={
                      () => {
                        activateUsers(item.id, "aktif")
                        handleWarning({ data: { username: item.username, message: "mengaktifkan" } })
                        relodData()
                      }
                    }>
                      <CheckCircle className="me-50" size={15} />{" "}
                      <span className="align-middle">Aktifkan</span>
                    </DropdownItem>
                  )
                }
                <DropdownItem onClick={(e) => {
                  e.preventDefault()
                  history.push(`/admin/instruktur/detail/${item.id}`)
                }}>
                  <FileText className="me-50" size={15} />{" "}
                  <span className="align-middle">Detail</span>
                </DropdownItem>

                <DropdownItem onClick={
                  () => {
                    handleDeleteUser(item, relodData)
                  }
                }>
                  <Trash className="me-50" size={15} />{" "}
                  <span className="align-middle">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      </tbody>
    )
  })
}

const TableBasic = () => {
  const [data, setData] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [relod, setRelodData] = useState(false)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    listInstruktur()
      .then((res) => {
        setData(res)
        setRelodData(false)
        setLoading(false)
      })
  }, [relod])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleShow = () => setShow(!show)
  const relodData = () => setRelodData(true)


  const RenderContent = () => {
    return (
      <>
        {
          data ? (
            <div className="d-flex flex-column">

              <Table responsive>
                <thead className='table-light '>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Jumlah Users</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {
                  relod !== true ? (
                    <Rendertable
                      data={data}
                      relodData={relodData}
                      open={show}
                      toggleOpen={toggleShow}
                      history={history}

                    />
                  ) : (
                    <Rendertable data={data} relodData={relodData} open={show} toggleOpen={toggleShow} />
                  )
                }
              </Table>
              <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
          ) : (
            <div>
              <h1>Belum Ada Datanya </h1>
            </div>
          )
        }
      </>
    )
  }

  return (
    <Fragment>
      <div className='table-header-actions d-flex flex-row-reverse mb-2'>
        <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
          Tambah Instruktur
        </Button>
      </div>
      {
        loading ? (
          <div
            style={{
              height: '65vh'
            }}
            className='d-flex align-items-center justify-content-center'>
            <img src={ilustrator} height={300} />
          </div>
        ) : (
          <RenderContent />
        )
      }
    </Fragment >
  )
}

export default TableBasic
