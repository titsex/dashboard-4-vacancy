export class OwnerValidation {
    static create = {
        schema: {
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string', maxLength: 255, minLength: 1 },
                },
            },
        },
    }

    static getOne = {
        schema: {
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'integer' },
                },
            },
        },
    }

    static getAll = {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    limit: { type: 'integer' },
                    offset: { type: 'integer' },
                },
            },
        },
    }

    static update = {
        schema: {
            body: {
                type: 'object',
                required: ['id', 'name'],
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string', maxLength: 255, minLength: 1 },
                },
            },
        },
    }

    static delete = {
        schema: {
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'integer' },
                },
            },
        },
    }
}
