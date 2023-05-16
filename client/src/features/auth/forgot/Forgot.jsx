import Input from 'shared/ui/input/Input.jsx'
import Form from 'shared/ui/form/Form.jsx'
import api from 'shared/api/axios.js'

import { emailSchema, passwordSchema } from 'shared/schema/auth.schema.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

const Signup = ({ setForm }) => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const schema = z
        .object({
            email: emailSchema,
            password: passwordSchema,
            confirmPassword: passwordSchema,
        })
        .refine(({ password, confirmPassword }) => password === confirmPassword, {
            message: "Passwords don't match",
            path: ['confirmPassword'],
        })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    const submitHandler = ({ confirmPassword: _, ...data }) =>
        api
            .post('/user/forgot', data)
            .then(({ data }) => setMessage(data.message))
            .catch(({ response }) => setError(response.data.message))

    if (message) return <span className="text-2xl">{message}</span>

    return (
        <Form register={register} handler={handleSubmit(submitHandler)} title="Password recovery">
            <Input type="email" placeholder="email" name="email" error={errors.email} />

            <Input type="password" placeholder="new password" name="password" error={errors.password} />

            <Input
                type="password"
                placeholder="new password confirmation"
                name="confirmPassword"
                error={errors.confirmPassword}
            />

            <span className="mt-5 ml-1">
                No account?{' '}
                <span onClick={() => setForm('signup')} className="text-red-500 cursor-pointer">
                    Sign up
                </span>
            </span>

            <button type="submit" className="text-black py-1 mt-5 mb-1 bg-cyan-300 rounded-lg font-medium text-lg">
                Go recovery
            </button>

            {error && <span className="dark:text-red-400 mt-5 text-red-600 text-center">{error}</span>}
        </Form>
    )
}

export default Signup
