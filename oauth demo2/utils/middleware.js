import { verify } from 'jsonwebtoken'

function middleware(request) {
    console.log(request)
    // const accessToken = request.cookies.get('accessToken')
    // if (!accessToken) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }
    // try {
    //     verify(accessToken.value, 'datpham')
    //     NextResponse.next()
    // } catch (error) {
    //     NextResponse.redirect(new URL('/login', request.url))
    // }
}

export const config = {
    matcher: ['/'],
}

export default middleware
