import Signup from './signup/Signup.jsx'
import Forgot from './forgot/Forgot.jsx'
import Signin from './signin/Signin.jsx'

import { useState } from 'react'

const Auth = () => {
    const [form, setForm] = useState('signup')

    if (form === 'signup') return <Signup setForm={setForm} />
    if (form === 'signin') return <Signin setForm={setForm} />
    if (form === 'forgot') return <Forgot setForm={setForm} />
}

export { Auth }
