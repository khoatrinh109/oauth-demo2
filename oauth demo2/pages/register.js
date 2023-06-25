import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const register = () => {
    const router = useRouter()
    const [account, setAccount] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleOnChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        })
    }
    const handleRegister = async () => {
        const result = await axios.post('/api/register', account)
        if (!result.data.success) {
            toast.error(result.data.message)
        } else {
            router.push('/')
        }
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center gap-4 border-solid border-[1px] shadow-md rounded-md px-[50px] py-[50px] w-[400px]'>
                <h1 className='text-[#7ed6df] text-[25px] italic select-none'>
                    Đăng ký
                </h1>
                <div className='w-full flex flex-col gap-4'>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        onChange={(e) => {
                            handleOnChange(e)
                        }}
                        placeholder='Tài khoản...'
                        className='w-full outline-none border-solid border-[1px] rounded-sm px-[5px] py-[8px] placeholder:text-[14px] placeholder:italic'
                    />
                    <input
                        id='password'
                        placeholder='Mật khẩu...'
                        type='password'
                        onChange={(e) => {
                            handleOnChange(e)
                        }}
                        name='password'
                        className='w-full outline-none border-solid border-[1px] rounded-sm px-[5px] py-[8px] placeholder:text-[14px] placeholder:italic'
                    />
                    <input
                        id='confirm_password'
                        type='password'
                        onChange={(e) => {
                            handleOnChange(e)
                        }}
                        name='confirmPassword'
                        placeholder='Nhập lại mật khẩu...'
                        className='w-full outline-none border-solid border-[1px] rounded-sm px-[5px] py-[8px] placeholder:text-[14px] placeholder:italic'
                    />
                </div>
                <div className='w-full flex justify-end'>
                    <button
                        id='btnRegister'
                        onClick={() => {
                            handleRegister()
                        }}
                        className='border-solid border-[1px] rounded-md px-[12px] py-[8px] bg-[#7ed6df] text-[#fff] uppercase font-medium text-[14px]'
                    >
                        Đăng ký
                    </button>
                </div>
                <div className='w-full flex gap-2 text-[14px] justify-end'>
                    <span className='opacity-70'>Bạn có tài khoản rồi?</span>
                    <Link href='/login/' className='text-[red] underline'>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default register
