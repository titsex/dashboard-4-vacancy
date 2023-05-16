import { createClient } from 'redis'
import { Logger } from '@class/Logger.js'

export class Cache {
    #url

    static client

    constructor(url) {
        this.#url = url
    }

    async connect() {
        Cache.client = createClient({ url: this.#url })

        return Cache.client
            .connect()
            .then(() => Logger.info('Successful connection to the redis server'))
            .catch(() => Logger.error('Bad connection to the redis server'))
    }

    static async getCache(key) {
        try {
            return await this.client.get(key)
        } catch (error) {
            throw new Error('There was some kind of error when trying to get data by the key')
        }
    }

    static async setCache(key, value) {
        try {
            await this.client.set(key, value, { EX: 60 * 5 })
        } catch (error) {
            throw new Error('There was some kind of error when poptyk data establishment')
        }
    }

    static async deleteCache(key) {
        try {
            await this.client.del(key)
        } catch (error) {
            throw new Error('There was some kind of error when trying to delete data by key')
        }
    }
}
