import axios from 'axios'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { upLoadImageCloudinary } from '../utils/func'

const registerApp = () => {
    const router = useRouter()
    const [appData, setAppData] = useState({
        logo: null,
        name: '',
        redirect_url: '',
        description: '',
    })

    const handleOnChange = (e) => {
        setAppData({
            ...appData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        const result = await axios.post('/api/registerApplication', {
            ...appData,
            logo: await upLoadImageCloudinary(appData.logo),
        })
        if (!result.data.success) {
            toast.error(result.data.message)
        } else {
            toast.success(result.data.message)
            setCookie('application_data', JSON.stringify(result.data.app))
            router.push('/application_data')
        }
    }
    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='flex flex-col mt-[50px] w-[800px]'>
                <div className='flex justify-center'>
                    <span className='text-[50px]'>Đăng ký ứng dụng</span>
                </div>
                <div className='mt-[25px] flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[18px] font-sans'>Logo</span>
                        <input
                            name='logo'
                            type='file'
                            onChange={(e) => {
                                setAppData({
                                    ...appData,
                                    logo: e.target.files[0],
                                })
                            }}
                            placeholder='Logo ứng dụng của bạn'
                            className='pl-[5px] py-[8px] placeholder:italic placeholder:font-thin outline-none border-[1px] border-solid border-[black] rounded-sm'
                        />
                    </div>
                    <div className='flex-col flex gap-2 '>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[18px] font-sans'>
                                Tên ứng dụng
                            </span>
                            <input
                                name='name'
                                onChange={(e) => {
                                    handleOnChange(e)
                                }}
                                placeholder='Tên ứng dụng của bạn'
                                className='pl-[5px] py-[8px] placeholder:italic placeholder:font-thin outline-none border-[1px] border-solid border-[black] rounded-sm'
                            />
                        </div>
                    </div>
                    <div className='flex-col flex gap-2 '>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[18px] font-sans'>
                                URL chuyển hướng
                            </span>
                            <input
                                name='redirect_url'
                                onChange={(e) => {
                                    handleOnChange(e)
                                }}
                                placeholder='Tên ứng dụng của bạn'
                                className='pl-[5px] py-[8px] placeholder:italic placeholder:font-thin outline-none border-[1px] border-solid border-[black] rounded-sm'
                            />
                        </div>
                    </div>
                    <div className='flex-col flex gap-2 '>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[18px] font-sans'>
                                Mô tả ứng dụng
                            </span>
                            <textarea
                                rows={6}
                                name='description'
                                onChange={(e) => {
                                    handleOnChange(e)
                                }}
                                placeholder='Mô tả về ứng dụng của bạn...'
                                className='pl-[5px] py-[8px] placeholder:italic placeholder:font-thin outline-none resize-none border-[1px] border-solid border-[black] rounded-sm'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-end mt-[20px]'>
                    <button
                        onClick={() => {
                            handleSubmit()
                        }}
                        className='border-solid border-[1px] rounded-md px-[12px] py-[8px] bg-[#7ed6df] text-[#fff] uppercase font-medium text-[14px]'
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    )
}

export default registerApp
export const getServerSideProps = async (context) => {
    const accessToken = context.req.cookies.accessToken

    if (!accessToken) {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            },
        }
    }
    return {
        props: {},
    }
}
