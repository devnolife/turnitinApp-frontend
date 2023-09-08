import {
    Card,
    CardHeader,
    Progress,
    Row,
    Col,
    Button,
    Label,
    CardBody
} from 'reactstrap'
import { ChevronDown, FileText, Share } from 'react-feather'
import DataTable from 'react-data-table-component'
import Avatar from '@components/avatar'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useParams } from 'react-router-dom'
import {
    instrukturDetailMonthYears,
    timeMonthYearsUsers,
    downloadLaporan
} from '../../component/api'
import { monthYearsNow, selectThemeColors } from '@utils'
import { useState, useEffect, Fragment } from 'react'
import Select from 'react-select'

const renderUserImg = (item) => {
    if (item.imageProfile !== null) {
        return (
            <div className="me-1" style={{
                width: '35px',
                height: '35px',
                overflow: 'hidden',
                borderRadius: '3px'
            }}>
                <img
                    style={{
                        width: '100%'
                    }}
                    alt='user-avatar'
                    src={item.imageProfile}
                />
            </div>
        )
    } else {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]
        return (
            <div className='avatar-wrapper'>
                <Avatar
                    initials
                    color={color}
                    className='rounded me-1'
                    content={item.nama !== null ? item.nama : item.username}
                    contentStyles={{
                        borderRadius: 0,
                        fontSize: 'calc(10px)',
                        width: '100%',
                        height: '100%'
                    }}
                    style={{
                        height: '35px',
                        width: '35px'
                    }}
                />
            </div>
        )
    }
}

export const columns = [
    {
        sortable: true,
        minWidth: '300px',
        name: 'Nama',
        selector: row => row.nama,
        cell: row => {
            return (
                <div className='d-flex justify-content-left align-items-center'>
                    {renderUserImg(row)}
                    <div className='d-flex flex-column'>
                        <span className='text-truncate fw-bolder'>{
                            row.nama !== null ? row.nama : row.username
                        }</span>
                        <small className='text-muted'>{row.username}</small>
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Nim',
        selector: row => row.nim
    },
    {
        name: 'Fakultas',
        selector: row => row.fakultas
    },
    {
        name: 'Progress',
        selector: row => row.progress,
        sortable: true,
        cell: row => {
            return (
                <div className='d-flex flex-column w-100'>
                    <small>{`${row.progress}%`}</small>
                    <Progress
                        value={row.progress}
                        style={{ height: '8px' }}
                        className={`w-100 progress-bar-rounded `}
                    />
                </div>
            )
        }
    },
    {
        name: 'Prodi',
        selector: row => row.prodi
    }
]

const ListUsers = () => {
    const params = useParams()
    const { id } = params
    const [data, setData] = useState([])
    const [month_, setMonth] = useState(null), [years_, setYears] = useState(null)

    const { month: monthNow, year: yearNow } = monthYearsNow()
    const [selectMonth, setSelectMont] = useState(monthNow),
        [selectYears, setSelectYears] = useState(yearNow)
    useEffect(async () => {
        await instrukturDetailMonthYears(id, selectMonth, selectYears)
            .then(data => {
                setData(data)
            })
    }, [selectMonth, selectYears])

    useEffect(async () => {
        await timeMonthYearsUsers()
            .then((data) => {
                setMonth(data.month)
                setYears(data.year)
            })
    }, [])

    const handleDownload = async (e) => {
        e.preventDefault()
        await downloadLaporan(id, selectMonth, selectYears)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Fragment>
            <Card>
                <Row className='p-2'>
                    <Row className='justify-content-between'>
                        {
                            month_ !== null && years_ !== null ? (
                                <>
                                    <Col className='mb-1' >
                                        <Label className='form-label'>Bulan</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select'
                                            classNamePrefix='select'
                                            defaultValue={Object.values(month_).find(item => item.value === monthNow)}
                                            name='loading'
                                            options={month_}
                                            isClearable={false}
                                            onChange={e => setSelectMont(e.value)}
                                        />
                                    </Col>
                                    <Col className='mb-1' >
                                        <Label className='form-label'>Tahun</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select'
                                            classNamePrefix='select'
                                            name='loading'
                                            defaultValue={Object.values(years_).find(item => item.value === yearNow)}
                                            options={years_}
                                            isClearable={false}
                                            onChange={e => setSelectYears(e.value)}
                                        />
                                    </Col>
                                </>
                            ) : null
                        }
                    </Row>
                    {/* Button export excel */}
                    <div className="d-flex justify-content-end">
                        <Button.Ripple
                            onClick={(e) => handleDownload(e)}
                            color='primary' outline>
                            Export Excel
                        </Button.Ripple>
                    </div>
                </Row>
            </Card>
            <Card>

                {
                    data.length === 0 ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <Card>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <div className='d-flex flex-column'>
                                            <h1 className='text-center'>Data Tidak Ada</h1>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    ) : (
                        <DataTable
                            noHeader
                            responsive
                            columns={columns}
                            data={data}
                            className='react-dataTable'
                            sortIcon={<ChevronDown size={10} />}
                        />
                    )
                }
            </Card>
        </Fragment>
    )
}

export default ListUsers
