export class UserValidation {
    static signup = {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string', maxLength: 255, minLength: 1 },
                    email: { type: 'string', maxLength: 64, minLength: 1 },
                    password: { type: 'string', maxLength: 32, minLength: 8 },
                },
            },
        },
    }

    static signin = {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', maxLength: 64, minLength: 1 },
                    password: { type: 'string', maxLength: 32, minLength: 8 },
                },
            },
        },
    }

    static activate = {
        schema: {
            params: {
                type: 'object',
                required: ['email', 'hex'],
                properties: {
                    email: { type: 'string' },
                    hex: { type: 'string' },
                },
            },
        },
    }

    static forgot = {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    name: { type: 'string', maxLength: 255, minLength: 1 },
                    password: { type: 'string', maxLength: 32, minLength: 8 },
                },
            },
        },
    }

    static confirmForgot = {
        schema: {
            params: {
                type: 'object',
                required: ['email', 'hex'],
                properties: {
                    email: { type: 'string' },
                    hex: { type: 'string' },
                },
            },
        },
    }
}
