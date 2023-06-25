import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Home() {
    const router = useRouter()
    const handleLogOut = async () => {
        const result = await axios.post('/api/logout')
        if (result.data.success) {
            router.push('/login')
        } else {
            toast.error(result.data.message)
        }
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='text-center'>
                <div className='text-[25px] font-medium'>Oauth2 DEMO</div>
                <div className='mt-[20px]'>
                    <Link href={'/register_app'}>
                        <div className='border-solid border-[1px] rounded-md px-[12px] py-[8px] bg-[#7ed6df] text-[#fff] uppercase font-medium text-[14px]'>
                            Đăng ký ứng dụng
                        </div>
                    </Link>
                </div>
                <div className='mt-[20px]'>
                    <button
                        onClick={() => {
                            handleLogOut()
                        }}
                        className='border-solid border-[1px] rounded-md px-[12px] py-[8px] bg-[#7ed6df] text-[#fff] uppercase font-medium text-[14px]'
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    )
}

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
