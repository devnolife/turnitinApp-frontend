import Sidebar from '@components/sidebar'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormText, Form, Input } from 'reactstrap'
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
    } = useForm({ defaultValues })


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
                        name='username'
                        control={control}
                        render={({ field }) => (
                            <Input id='username' placeholder='siFulan99' invalid={errors.username && true} {...field} />
                        )}
                    />
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='email'>
                        Email <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field }) => (
                            <Input
                                type='email'
                                id='email'
                                placeholder='siFulan99@contoh.com'
                                invalid={errors.email && true}
                                {...field}
                            />
                        )}
                    />
                    <FormText color='muted'>You can use letters, numbers & periods</FormText>
                </div>

                <div className='mb-1'>
                    <Label className='form-label' for='no_hp'>
                        No HP(WhatsApp)<span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='no_hp'
                        control={control}
                        render={({ field }) => (
                            <Input id='no_hp' invalid={errors.no_hp && true} {...field} />
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