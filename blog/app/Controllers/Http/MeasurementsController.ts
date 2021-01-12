import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import Measurement from 'App/Models/Measurement'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'

export default class MeasurementsController {
  public async index ({ params }: HttpContextContract) {
    const item = await Item.find(params.item_id)
    await item?.preload('measurements')

    return item?.measurements
  }

  public async store ({ request, params }: HttpContextContract) {
    const userSchema = schema.create({
      measurement: schema.file({
        extnames: ['csv', 'z'],
      }),
    })

    const data = await request.validate({
      schema: userSchema,
    })

    const file_name = `${new Date().getTime()}.${data.measurement.extname}`

    await data.measurement.move(Application.publicPath('measurements'), {
      name: file_name,
    })

    const measurement = new Measurement()
    measurement.file_name = `measurements/${file_name}`

    const item = await Item.findOrFail(params.item_id)

    await item.related('measurements').save(measurement)
  
    return measurement
  }

  public async show ({ params }: HttpContextContract) {
    const measurement = await Measurement.findOrFail(params.measurement_id)

    return measurement
  }

  public async update ({ params }: HttpContextContract) {
  }

  public async destroy ({ params }: HttpContextContract) {
    const measurement = await Measurement.findOrFail(params.measurement_id)

    await measurement.delete()

    return true
  }
}
