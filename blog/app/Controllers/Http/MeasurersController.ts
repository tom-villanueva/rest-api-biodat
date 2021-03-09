import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Measurer from 'App/Models/Measurer'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MeasurersController {
  public async index ({}: HttpContextContract) {
    return await Database.query().select('*').from('measurers');
  }

  public async store ({ request }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string( {trim: true }, [
        rules.maxLength(255)
      ]),
    })

    const measurerDetails = await request.validate({
      schema: validationSchema,
      reporter: validator.reporters.api,
    })

    const measurer = new Measurer() 
    measurer.name = measurerDetails.name

    await measurer.save()

    return measurer
  }

  public async show ({}: HttpContextContract) {
  }

  public async update ({ params, request }: HttpContextContract) {
    const measurer = await Measurer.findOrFail(params.measurer_id)

    const data = request.only(['name'])

    measurer.name = data.name

    await measurer.save()

    return measurer
  }

  public async destroy ({ params }: HttpContextContract) {
    const measurer = await Measurer.findOrFail(params.measurer_id)

    await measurer.delete()

    return {status: 204}
  }
}
