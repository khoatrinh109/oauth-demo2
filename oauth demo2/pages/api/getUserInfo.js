import prisma from '../../prisma/prisma'
import { verify } from 'jsonwebtoken'
const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { accessToken } = req.body

            const verifyAccessToken = verify(accessToken, 'datpham')

            const userInfo = await prisma.users.findUnique({
                where: {
                    id: verifyAccessToken._id,
                },
            })
            if (!userInfo)
                return res
                    .status(404)
                    .json({ message: 'Không hợp lệ', success: false })

            return res.json({ success: true, userInfo: userInfo })
        } catch (error) {
            res.status(500).json('Server not found!')
        }
    }
}

export default handler
