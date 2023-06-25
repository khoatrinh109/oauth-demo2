import prisma from '../../prisma/prisma'
import { hash } from 'argon2'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password, confirmPassword } = req.body

        if (!(email && password && confirmPassword)) {
            return res.json({
                message: 'Không được để trống dữ liệu',
                success: false,
            })
        }

        try {
            const exitsAccount = await prisma.users?.findFirst({
                where: { email },
            })

            if (exitsAccount) {
                return res.json({
                    message: 'Tài khoản đã tồn tại',
                    success: false,
                })
            }
            if (!(password == confirmPassword)) {
                return res.json({
                    message: 'Mật khẩu không khớp',
                    success: false,
                })
            }
            const hashPassword = await hash(password)

            const newAccount = await prisma.users.create({
                data: {
                    email,
                    avatar: `https://ui-avatars.com/api/?name=${email[0]}`,
                    password: hashPassword,
                },
            })

            res.json(newAccount)
        } catch (error) {
            res.status(500).json('Server not found!')
        }
    }
}
