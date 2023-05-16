import Layout from 'app/layout/Layout.jsx'

import { ProfilePageRoute, PetPageRoute, ActivateAccountPageRoute, RecoveryPasswordPageRoute } from 'pages'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            RecoveryPasswordPageRoute,
            ActivateAccountPageRoute,
            ProfilePageRoute,
            PetPageRoute,
            {
                path: '*',
                element: <Navigate to="/" />,
            },
        ],
    },
])

export default router
