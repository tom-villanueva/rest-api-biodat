import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class AuthController {
  public async index ({}: HttpContextContract) {
    //DEVUELVE TODOS LOS USUARIOS EN LA BASE DE DATOS
    return await Database.query().select('*').from('users');
  }

  public async login ({ request, auth }: HttpContextContract) {
    //LOGEA UN USUARIO Y LO ENVÍA A SU PERFIL
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }

  public async store ({ request, auth }: HttpContextContract) {
    //REGISTRA UN USUARIO GUARDANDOLO EN LA BD. PRIMERO VALIDA LOS DATOS
    const validationSchema = schema.create({
      email: schema.string( {trim: true }, [
        rules.email(),
        rules.unique( { table: 'users', column: 'email' }),
      ]),
      password: schema.string( {trim: true }, [
        rules.confirmed(),
      ]), 
    })

    const userDetails = await request.validate({
      schema: validationSchema,
      reporter: validator.reporters.api,
    })

    const user = await User.create(userDetails)

    ///return user
    const token = await auth.use('api').login(user)//.attempt(email, password)
    return token.toJSON() 
  }

  public async logout ({ auth }: HttpContextContract) {
    //LOGOUT DEL USUARIO
    await auth.use('api').logout();
    return {status: 204};
  }

  public async show ({ params, auth }: HttpContextContract) {
    //SI EL USUARIO ESTA LOGEADO Y ES DUEÑO DEL PERFIL PUEDE VERLO
    if ((auth.user != null)&&(auth.user.id == params.id)){
      return await User.find(auth.user.id)
    }
    else{
      return 'no tienes permiso para ver este perfil'
    }   
  }

}
