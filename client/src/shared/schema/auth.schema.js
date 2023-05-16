import { z } from 'zod'

export const nameSchema = z
    .string()
    .min(1, 'Name is required')
    .max(255, 'The name cannot be longer than 255 characters')

export const emailSchema = z.string().email('Email must be email')

export const passwordSchema = z
    .string()
    .min(8, 'Password length is at least 8 characters')
    .max(32, 'Password length max 32 characters')
