import router from 'shared/lib/router.jsx'

import { RouterProvider } from 'react-router-dom'

export const withRouter = () => () => <RouterProvider router={router} />
