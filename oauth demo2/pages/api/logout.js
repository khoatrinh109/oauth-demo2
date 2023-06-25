import { serialize } from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', [
            serialize('accessToken', '', {
                maxAge: -1,
                path: '/',
            }),
        ]).json({ message: 'Đăng xuất thành công', success: true })
    }
}
