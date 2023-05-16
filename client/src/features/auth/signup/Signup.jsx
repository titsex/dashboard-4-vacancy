import Input from 'shared/ui/input/Input.jsx'
import Form from 'shared/ui/form/Form.jsx'
import api from 'shared/api/axios.js'

import { emailSchema, nameSchema, passwordSchema } from 'shared/schema/auth.schema.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

const Signup = ({ setForm }) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const schema = z
        .object({
            name: nameSchema,
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
            .post('/user/signup', data)
            .then(({ data }) => {
                setMessage(data.message)
                setError('')
            })
            .catch(({ response }) => setError(response.data.message))

    if (message) return <span className="text-2xl">{message}</span>

    return (
        <Form register={register} handler={handleSubmit(submitHandler)} title="Sign up">
            <Input placeholder="name" name="name" error={errors.name} />

            <Input type="email" placeholder="email" name="email" error={errors.email} />

            <Input type="password" placeholder="password" name="password" error={errors.password} />

            <Input
                type="password"
                placeholder="password confirmation"
                name="confirmPassword"
                error={errors.confirmPassword}
            />

            <span className="mt-5 ml-1">
                Have an account?{' '}
                <span onClick={() => setForm('signin')} className="text-green-500 cursor-pointer">
                    Sign in
                </span>
            </span>

            <button type="submit" className="text-black py-1 mt-5 bg-cyan-300 rounded-lg font-medium text-lg">
                Go Sign up
            </button>

            {error && <span className="dark:text-red-400 mt-5 text-red-600 text-center">{error}</span>}
        </Form>
    )
}

export default Signup
