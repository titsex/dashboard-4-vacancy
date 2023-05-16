import { UserService } from '@service/user.service.js'
import { getIp } from '@utils'

export class UserController {
    static async signup(request) {
        const { name, email, password } = request.body

        return await UserService.signup({ name, email, password })
    }

    static async activate(request) {
        const { email, hex } = request.params

        return await UserService.activate({ email, hex }, getIp(request))
    }

    static async signin(request, reply) {
        const { email, password } = request.body

        const userData = await UserService.signin({ email, password }, getIp(request))

        reply.setCookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return userData
    }

    static async forgot(request) {
        const { email, password } = request.body

        return await UserService.forgot({ email, password })
    }

    static async confirmForgot(request) {
        const { email, hex } = request.params

        return await UserService.confirmForgot({ email, hex })
    }

    static async refresh(request, reply) {
        const { refreshToken } = request.cookies

        const userData = await UserService.refresh(refreshToken, getIp(request))

        reply.setCookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return userData
    }

    static async signout(request, reply) {
        const { refreshToken } = request.cookies

        await UserService.signout(refreshToken)
        reply.clearCookie('refreshToken')

        return { message: 'You have successfully logged out' }
    }
}
