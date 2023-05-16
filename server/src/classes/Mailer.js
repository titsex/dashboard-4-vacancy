import { createTransport } from 'nodemailer'
import { Logger } from '@class/Logger.js'

let transporter

export class Mailer {
    static connect() {
        transporter = createTransport({
            host: process.env.EMAIL_SMTP,
            secure: true,
            port: +process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
    }

    static async sendMail(to, hex, subject) {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text: hex,
        })
    }

    static checkConnection() {
        transporter
            .sendMail({
                from: '',
                to: '',
                subject: '',
                text: '',
            })
            .catch((error) => {
                if (error.message.match('Invalid login')) Logger.error('Bad connection to the mailer service')
                else Logger.info('Successful connection to the mailer service')
            })
    }
}
