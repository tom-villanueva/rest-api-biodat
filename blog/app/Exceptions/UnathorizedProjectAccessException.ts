import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UnathorizedProjectAccessException extends Exception {
    constructor (message: string) {
        super(message, 403)
    }
    public async handle(error: this, { response }: HttpContextContract) {
        response
        .status(error.status).json({
            status: 403,
            statusText: "Forbidden",
            error: 'You do not belong to this project',
        })
    }   
}
