import React from 'react'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

import axios from 'axios'
import { useRouter } from 'next/router'
const confirm = ({ application, user }) => {
    const router = useRouter()
    const handleAccept = async () => {
        console.log('a')
        const code = await axios.post('/api/oauth2/createCode', {
            id: user._id,
        })
        window.location.replace(
            `${application.redirect_url}?code=${code.data.code}`,
        )
    }
    const handleCancel = () => {
        router.push(`/oauth?clientId=${application.clientId}`)
    }
    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className='flex flex-col gap-2 border-solid border-[1px] shadow-md rounded-md w-[400px] '>
                    <div className='border-b-solid border-b-[1px] px-[10px] py-[10px] rouned-md flex gap-2'>
                        <img
                            className='w-[25px] h-[25px] rounded-full'
                            src='/abc_logo.png'
                        />
                        <span>Đăng nhập bằng ABC</span>
                    </div>
                    <div className='flex flex-col px-[20px] pb-[50px]'>
                        <div className='flex flex-col items-center gap-2 px-[50px] py-[50px]'>
                            <img
                                className='w-[50px] h-[50px] rounded-full'
                                src={application.logo}
                            />
                            <div className='text-[25px]'>
                                <p className='text-center'>
                                    <span className='text-[#3498db] font-medium mr-[5px]'>
                                        {application.name}
                                    </span>
                                    muốn truy cấp vào Tài Khoản ABC của bạn
                                </p>
                            </div>
                            <div className='flex gap-2'>
                                <img
                                    className='w-[30px] h-[30px] rounded-full'
                                    src={user.avatar}
                                />
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div className='flex justify-center gap-1'>
                            <button
                                onClick={() => {
                                    handleCancel()
                                }}
                                className='px-[10px] py-[8px] border-solid border-[1px] border-[#7ed6df] w-[150px] hover:bg-[#c7ecee]'
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => {
                                    handleAccept()
                                }}
                                className='px-[10px] py-[8px] border-solid border-[1px] border-[#7ed6df] w-[150px] hover:bg-[#c7ecee]'
                            >
                                Cho phép
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default confirm
export const getServerSideProps = async (context) => {
    const prisma = new PrismaClient()
    const accessToken = context.req.cookies.accessToken
    const user = verify(accessToken, 'datpham')

    const { clientId } = context.query

    const verifyClientId = await prisma.application.findFirst({
        where: {
            clientId,
        },
    })

    if (!verifyClientId && accessToken) {
        return { notFound: true }
    }
    return {
        props: {
            application: verifyClientId,
            user: user,
        },
    }
}
