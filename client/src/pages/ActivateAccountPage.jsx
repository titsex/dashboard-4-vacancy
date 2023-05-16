import ErrorView from 'features/auth/activate/ErrorView.jsx'
import Signin from 'features/auth/signin/Signin.jsx'
import api from 'shared/api/axios.js'

import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { userStore } from 'store'

const ActivateAccountPage = () => {
    const isAuth = userStore((state) => state.isAuth)
    if (isAuth) return <Navigate to="/" replace />

    const [activated, setActivated] = useState(false)
    const [error, setError] = useState('')
    const { email, hex } = useParams()

    useEffect(() => {
        api.post(`/user/activate/${email}/${hex}`)
            .then(() => setActivated(true))
            .catch(({ response }) => setError(response.data.message))
    }, [])

    if (error) return <ErrorView error={error} />
    if (activated) return <Signin watchHelpers={false} />
}

const ActivateAccountPageRoute = {
    path: '/activate/:email/:hex',
    element: <ActivateAccountPage />,
}

export { ActivateAccountPage, ActivateAccountPageRoute }
