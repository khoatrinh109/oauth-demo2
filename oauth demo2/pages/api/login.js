import prisma from '../../prisma/prisma.js'
import { verify } from 'argon2'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({
                message: 'Tài khoản hoặc mật khẩu đang trống',
                success: false,
            })
        }

        try {
            const exitsAccount = await prisma.users?.findFirst({
                where: { email },
            })

            if (!exitsAccount) {
                return res.json({
                    message: 'Tài khoản hoặc mật khẩu không đúng',
                    success: false,
                })
            }

            const decodePassword = await verify(exitsAccount.password, password)

            if (!decodePassword) {
                return res.json({
                    message: 'Tài khoản hoặc mật khẩu không đúng',
                    success: false,
                })
            }

            const accessToken = sign({ _id: exitsAccount.id }, 'datpham', {
                expiresIn: '1h',
            })

            res.setHeader(
                'Set-Cookie',
                serialize('accessToken', accessToken, { path: '/' }),
            ).json({ message: 'Đăng nhập thành công', success: true })
        } catch (error) {
            res.status(500).json('Server not found!')
        }
    }
}
