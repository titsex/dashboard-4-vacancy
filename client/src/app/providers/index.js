import compose from 'compose-function'

import { withRouter } from './with-router.jsx'

export const withProviders = compose(withRouter)
