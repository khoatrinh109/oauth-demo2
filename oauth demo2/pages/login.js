import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const login = () => {
    const router = useRouter()
    const [account, setAccount] = useState({
        email: '',
        password: '',
    })

    const handleOnChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        })
    }
    const handleLogin = async () => {
        const result = await axios.post('/api/login', account)
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
                    Đăng nhập
                </h1>
                <div className='w-full flex flex-col gap-4'>
                    <input
                        id='email'
                        name='email'
                        onChange={(e) => {
                            handleOnChange(e)
                        }}
                        type='email'
                        placeholder='Tài khoản...'
                        className='w-full outline-none border-solid border-[1px] rounded-sm px-[5px] py-[8px] placeholder:text-[14px] placeholder:italic'
                    />
                    <input
                        id='password'
                        name='password'
                        type='password'
                        onChange={(e) => {
                            handleOnChange(e)
                        }}
                        placeholder='Mật khẩu...'
                        className='w-full outline-none border-solid border-[1px] rounded-sm px-[5px] py-[8px] placeholder:text-[14px] placeholder:italic'
                    />
                </div>
                <div className='w-full flex justify-end'>
                    <button
                        id='btnLogin'
                        onClick={() => {
                            handleLogin()
                        }}
                        className='border-solid border-[1px] rounded-md px-[12px] py-[8px] bg-[#7ed6df] text-[#fff] uppercase font-medium text-[14px]'
                    >
                        Đăng nhập
                    </button>
                </div>
                <div className='w-full flex gap-2 text-[14px] justify-end'>
                    <span className='opacity-70'>Bạn chưa có tài khoản?</span>
                    <Link href='/register' className='text-[red] underline'>
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default login
