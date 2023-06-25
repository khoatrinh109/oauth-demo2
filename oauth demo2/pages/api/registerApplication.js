import prisma from '../../prisma/prisma'
import { v4 as uuidv4 } from 'uuid'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, logo, redirect_url, description } = req.body

        if (!(name && logo && description)) {
            return res.json({
                message: 'Không được để trống dữ liệu',
                success: false,
            })
        }

        try {
            const exitsApp = await prisma.application?.findFirst({
                where: { name },
            })

            if (exitsApp) {
                return res.json({
                    message: 'Ứng dụng đã tồn tại',
                    success: false,
                })
            }

            const newApp = await prisma.application.create({
                data: {
                    clientId: uuidv4(),
                    clientSecret: uuidv4(),
                    name,
                    logo,
                    description,
                    redirect_url,
                },
            })

            res.json({
                message: 'Đăng ký thành công',
                success: true,
                app: newApp,
            })
        } catch (error) {
            res.status(500).json('Server not found!')
        }
    }
}
