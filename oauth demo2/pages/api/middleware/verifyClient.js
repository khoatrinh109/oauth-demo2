import { parse } from 'cookie'
import prisma from '../../../prisma/prisma'
export default function verifyClient(handler) {
    return async (req, res) => {
        const { clientId } = parse(req.headers.cookie)
        if (!clientId) return res.send('Invalid request')
        const client = await prisma.application.findFirst({
            where: {
                clientId: clientId,
            },
        })

        if (!client) return res.send('Invalid request')

        return await handler(req, res)
    }
}
