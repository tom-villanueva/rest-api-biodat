import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UnathorizedProjectAccessException extends Exception {
    constructor (message: string) {
        super(message, 403)
    }
    public async handle(error: this, { response }: HttpContextContract) {
        return response
        .status(error.status).json({
            error: 'No perteneces a este proyecto, no puedes acceder a el'
        })
    }   
}
