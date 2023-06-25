import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
const ApplicationData = () => {
    const [appData, setAppData] = useState({
        clientId: '',
        clientSecret: '',
    })
    useEffect(() => {
        if (getCookie('application_data')) {
            setAppData({
                clientId: JSON.parse(getCookie('application_data')).clientId,
                clientSecret: JSON.parse(getCookie('application_data'))
                    .clientSecret,
            })
        }
    }, [getCookie('application_data')])
    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className='flex flex-col gap-2 border-[1px] border-[black] px-[25px] py-[15px]'>
                    <div className='flex gap-2 items-center'>
                        <span>ClientId :</span>
                        <div>{appData.clientId}</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span>clientSecret :</span>
                        <div> {appData.clientSecret}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicationData
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
