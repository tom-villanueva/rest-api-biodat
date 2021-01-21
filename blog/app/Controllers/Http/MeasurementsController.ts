import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item        from 'App/Models/Item'
import Measurement from 'App/Models/Measurement'
import Measurer    from 'App/Models/Measurer'
import Application from '@ioc:Adonis/Core/Application'
import Database    from '@ioc:Adonis/Lucid/Database'
import Parser      from 'App/Services/Parser'

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
    const measurer_name = request.only(['measurer'])
    const measurer_id = await Database.query()
                                   .select('id')
                                   .from('measurers')
                                   .where('name', `${measurer_name.measurer}`).first()                                
    //const measurer = await Measurer.findOrFail(measurer_id.id)
    const item = await Item.findOrFail(params.item_id)
    const newMeasurements : Array<Measurement> = []

    for (let measurement of measurements) {
      //const file_name = `${new Date().getTime()}.${measurement.extname}`
      await measurement.move(Application.publicPath('measurements'))
      const newMeasurement = new Measurement()
      newMeasurement.file_name = `${measurement.clientName}`
      newMeasurement.measurerId = measurer_id.id
      newMeasurements.push(newMeasurement)
      await item.related('measurements').save(newMeasurement)
    }

    return newMeasurements
  }

  public async show ({ params }: HttpContextContract) {
    const measurement = await Measurement.findOrFail(params.measurement_id)
    const measurer = await Measurer.findOrFail(measurement.measurerId)
    const filesPath = Application.publicPath('measurements')
    const filePath = filesPath.concat('\\', measurement.file_name)
    const parser = new Parser(measurer.name)
    //console.log("filepath ", filePath)
    let measurementData = await parser.parse(filePath)
    //console.log("data " ,measurementData)
    return measurementData
  }

  public async update ({ params }: HttpContextContract) {
  }

  public async destroy ({ params }: HttpContextContract) {
    const measurement = await Measurement.findOrFail(params.measurement_id)

    await measurement.delete()

    return true
  }
}
