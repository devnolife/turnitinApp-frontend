import Sidebar from '@components/sidebar'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormText, Form, Input, FormFeedback } from 'reactstrap'
import { addListInstruktur, checkNumberRegister } from '../api/index'

import { ToastError, ToastSuccees } from "../auth/toast"
import { checkUsername } from '@utils'
import { toast, Slide } from 'react-toastify'
const defaultValues = {
    username: '',
    nama: '',
    email: '',
    no_hp: '62',
    password: '12345678'
}

const checkIsValid = data => {
    if (checkUsername(data.username)) {
        return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
    } else {
        toast.error(
            <ToastError message="Username tidak boleh mengandung spasi dan min 8 karakter " />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    }

}

const SideBarAddInstruktur = ({ open, toggleSidebar }) => {
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange'
    })


    const onSubmit = async (data) => {
        checkNumberRegister(data.no_hp)
            .then(async () => {
                if (checkIsValid(data)) {
                    await addListInstruktur(data)
                        .then(() => {
                            <ToastSuccees message={'Berhasil menambahkan instruktur'} />
                            toggleSidebar()
                        }).catch((err) => {
                            toast.error(
                                <ToastError message={err.response.data.message} />,
                                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                            )
                        })

                } else {
                    for (const key in data) {
                        if (data[key] !== null && data[key].length === 0) {
                            setError(key, {
                                type: 'manual'
                            })
                        }
                    }
                }

            })
            .catch(() => {
                toast.error(
                    <ToastError message="Nomor WhatsApp Tidak Daftar !" />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
            })
    }

    const handleSidebarClosed = () => {
        for (const key in defaultValues) {
            setValue(key, '')
        }
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title='Tambah Instruktur'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1'>
                    <Label className='form-label' for='nama'>
                        Nama <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='nama'
                        control={control}
                        render={({ field }) => (
                            <Input id='nama' placeholder='si Fulan' invalid={errors.nama && true} {...field} />
                        )}
                    />
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='username'>
                        Username <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        id='username'
                        name='username'
                        control={control}
                        rules={{
                            minLength: 8,
                            validate: value => !/\s/.test(value)
                        }}
                        render={({ field }) => (
                            <Input placeholder='username'
                                invalid={errors.username && true} {...field} />
                        )}
                    />
                    {errors.username ? <FormFeedback>username minimal berjumlah 8 karakter dan tidak mengandung spasi</FormFeedback> : null}
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='email'>
                        Email <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        id='email'
                        name='email'
                        control={control}
                        rules={{
                            required: 'Email harus diisi',
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: 'Email tidak valid'
                            }
                        }}
                        render={({ field }) => (
                            <Input type='email' placeholder='email' invalid={errors.email && true} {...field} />
                        )}
                    />
                    {errors.email ? <FormFeedback>{errors.email.message}</FormFeedback> : null}
                </div>

                <div className='mb-1'>
                    <Label className='form-label' for='no_hp'>
                        No HP(WhatsApp)<span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        id='no_hp'
                        name='no_hp'
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <>
                                <Input
                                    type='number'
                                    invalid={errors.no_hp && true}
                                    {...field}
                                />
                                {errors.no_hp && <FormFeedback>No WhatsApp harus diisi</FormFeedback>}

                            </>
                        )}
                    />
                </div>

                <div className='mb-1'>
                    <Label className='form-label' for='password'>
                        Password <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='password'
                        control={control}
                        render={({ field }) => (
                            <Input id='password' placeholder='' invalid={errors.password && true} {...field} />
                        )}
                    />
                </div>
                <Button type='submit' className='me-1' color='primary'>
                    Submit
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SideBarAddInstruktur