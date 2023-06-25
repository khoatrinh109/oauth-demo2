import { sign } from 'jsonwebtoken'
import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { id } = req.body
            if (!id) return res.json({ success: false })
            const checkId = await prisma.users.findUnique({
                where: {
                    id: id,
                },
            })
            if (!checkId) return res.json({ success: false })
            const codeAuthorization = sign({ _id: id }, 'datpham', {
                expiresIn: '1h',
            })
            return res.json({ success: true, code: codeAuthorization })
        } catch (error) {
            res.status(500).json('Server not found!')
        }
    }
}
