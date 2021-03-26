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
    
    const item = await Item.findOrFail(params.item_id)
    const newMeasurements : Array<Measurement> = []

    for (let measurement of measurements) {
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
    // var para la ubicacion de los archivos
    const filesPath = Application.publicPath('measurements')
    let filePath = "";

    // var para parsear los datos con diferentes estrategias
    const parser = new Parser("");
    let measurer;

    // var para las mediciones
    const measurements: any = []; 
    let measurement;
    let measurement_ids = params.measurement_ids.split(",");

    // var para los datos parseados
    let measurementData;
    let measurementDataArray:any = [];

    for(let id of measurement_ids) {
      id = parseInt(id);
      measurement = await Measurement.findOrFail(id);
      measurements.push(measurement);
    }
    
    for(let measurement of measurements){
      measurer = await Measurer.findOrFail(measurement.measurerId);
      parser.setStrategy(measurer.name);
      filePath = filesPath.concat('\\', measurement.file_name);
      measurementData = await parser.parse(filePath);
      console.log("data", measurementData);
      measurementDataArray.push(measurementData);
    }

    return measurementDataArray;
  }

  public async update ({ params }: HttpContextContract) {
  }

  public async destroy ({ params }: HttpContextContract) {
    const measurement = await Measurement.findOrFail(params.measurement_id)

    await measurement.delete()

    return {status: 204}
  }
}
