import { TokenService } from '@service/token.service.js'
import { Unauthorized } from '@class/Error.js'

export default function (request, response, done) {
    const authorization = request.headers.authorization
    if (!authorization) throw new Unauthorized()

    const accessToken = authorization.split(' ')[1]
    if (!accessToken) throw new Unauthorized()

    const userData = TokenService.validateAccessToken(accessToken)
    if (!userData) throw new Unauthorized()

    request.user = userData
    done()
}
