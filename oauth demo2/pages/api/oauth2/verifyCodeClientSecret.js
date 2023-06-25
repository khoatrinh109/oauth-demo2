import { sign, verify } from 'jsonwebtoken'
import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { code, clientSecret } = req.body

            if (!code && clientSecret)
                return res.status(404).json({ success: false })
            const verifyCode = verify(code, 'datpham')

            if (!verifyCode) return res.status(404).json({ success: false })
            const checkId = await prisma.users.findUnique({
                where: {
                    id: verifyCode._id,
                },
            })

            if (!checkId) res.status(404).json({ success: false })

            const checkClientSecret = await prisma.application.findFirst({
                where: {
                    clientSecret: clientSecret,
                },
            })

            if (!checkClientSecret) res.status(404).json({ success: false })

            const accessToken = sign({ _id: verifyCode._id }, 'datpham', {
                expiresIn: '1h',
            })

            return res.json({ success: true, accessToken: accessToken })
        } catch (error) {
            res.status(500).json('Server not found!')
        }
    }
}
