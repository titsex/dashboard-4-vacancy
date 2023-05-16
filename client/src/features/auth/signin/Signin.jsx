import Input from 'shared/ui/input/Input.jsx'
import Form from 'shared/ui/form/Form.jsx'
import api from 'shared/api/axios.js'

import { emailSchema, passwordSchema } from 'shared/schema/auth.schema.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { userStore, tokenStore } from 'store'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

const Signin = ({ setForm, watchHelpers = true }) => {
    const [error, setError] = useState('')
    const [setIsAuth, setUser] = userStore((state) => [state.setIsAuth, state.setUser])
    const [setToken] = tokenStore((state) => [state.setToken])

    const schema = z.object({
        email: emailSchema,
        password: passwordSchema,
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    const submitHandler = (data) =>
        api
            .post('/user/signin', data)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.accessToken)
                setIsAuth(true)
                setError('')
            })
            .catch(({ response }) => setError(response.data.message))

    return (
        <Form register={register} handler={handleSubmit(submitHandler)} title="Sign in">
            <Input type="email" placeholder="email" name="email" error={errors.email} />
            <Input type="password" placeholder="password" name="password" error={errors.password} />

            {watchHelpers && (
                <div className="flex flex-col mt-5 ml-1">
                    <span>
                        No account?{' '}
                        <span onClick={() => setForm('signup')} className="text-red-500 cursor-pointer">
                            Sign up
                        </span>
                    </span>

                    <span>
                        Forgot your password?{' '}
                        <span onClick={() => setForm('forgot')} className="text-yellow-500 cursor-pointer">
                            Recover
                        </span>
                    </span>
                </div>
            )}

            <button type="submit" className="text-black py-1 mt-5 bg-cyan-300 rounded-lg font-medium text-lg">
                Go Sign in
            </button>

            {error && <span className="dark:text-red-400 mt-5 text-red-600 text-center">{error}</span>}
        </Form>
    )
}

export default Signin
