import ErrorView from 'features/auth/forgot/ErrorView.jsx'
import Signin from 'features/auth/signin/Signin.jsx'
import api from 'shared/api/axios.js'

import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { userStore } from 'store'

const RecoveryPasswordPage = () => {
    const isAuth = userStore((state) => state.isAuth)
    if (isAuth) return <Navigate to="/" replace />

    const [recovered, setRecovered] = useState(false)
    const [error, setError] = useState('')
    const { email, hex } = useParams()

    useEffect(() => {
        api.post(`/user/forgot/confirm/${email}/${hex}`)
            .then(() => setRecovered(true))
            .catch(({ response }) => setError(response.data.message))
    }, [])

    if (error) return <ErrorView error={error} />
    if (recovered) return <Signin watchHelpers={false} />
}

const RecoveryPasswordPageRoute = {
    path: '/recovery/:email/:hex',
    element: <RecoveryPasswordPage />,
}

export { RecoveryPasswordPage, RecoveryPasswordPageRoute }
