import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import Measurement from 'App/Models/Measurement'
import Application from '@ioc:Adonis/Core/Application'

export default class MeasurementsController {
  public async index ({ params }: HttpContextContract) {
    const item = await Item.find(params.item_id)
    await item?.preload('measurements')

    return item?.measurements
  }

  public async store ({ request, params }: HttpContextContract) {
    const measurements = request.files('measurement', {
      extnames: ['csv', 'z'],
    })
    const item = await Item.findOrFail(params.item_id)
    const newMeasurements : Array<Measurement> = []

    for (let measurement of measurements) {
      //const file_name = `${new Date().getTime()}.${measurement.extname}`
      await measurement.move(Application.publicPath('measurements'))
      const newMeasurement = new Measurement()
      newMeasurement.file_name = `${measurement.clientName}`
      newMeasurements.push(newMeasurement)
      await item.related('measurements').save(newMeasurement)
    }

    return newMeasurements
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
