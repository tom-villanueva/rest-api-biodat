import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item        from 'App/Models/Item'
import Measurement from 'App/Models/Measurement'
import Measurer    from 'App/Models/Measurer'
import Application from '@ioc:Adonis/Core/Application'
import Database    from '@ioc:Adonis/Lucid/Database'
import Parser      from 'App/Services/Strategies/Parser'

export default class MeasurementsController {
  public async index ({ params }: HttpContextContract) {
    const item = await Item.find(params.item_id)
    await item?.preload('measurements')

    return item?.measurements
  }

  public async store ({ request, params }: HttpContextContract) {
    const measurements = request.files('measurement', {
      extnames: ['csv', 'z', 'spec'],
    })
    const measurer_name = request.only(['measurer'])
    const project_id = request.only(['project'])
    const item_id = request.only(['item'])

    // const project_name = await Database.query()
    //                                .select('name')
    //                                .from('projects')
    //                                .where('id', parseInt(project_id.project)).first();
    
    const measurer = await Database.query()
                                   .select('id')
                                   .from('measurers')
                                   .where('name', `${measurer_name.measurer}`).first()                                
    
    const item = await Item.findOrFail(params.item_id)
    const newMeasurements : Array<Measurement> = []

    for (let measurement of measurements) {
      await measurement.move(Application.publicPath(`measurements/${project_id.project}/${item_id.item}`))
      const newMeasurement = new Measurement()
      newMeasurement.file_name = `${measurement.clientName}`
      newMeasurement.measurerId = measurer.id
      newMeasurements.push(newMeasurement)
      await item.related('measurements').save(newMeasurement)
    }

    return newMeasurements
  }

  public async commonShow(params) {
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
      try {
        id = parseInt(id);
        measurement = await Measurement.findOrFail(id);
        measurements.push(measurement);
      } catch (err) {
        console.log("Algo anduvo mal con las medidas ", err);
      }
    }

    for(let measurement of measurements){
      try {
        measurer = await Measurer.findOrFail(measurement.measurerId);
        parser.setStrategy(measurer.name);
        filePath = filesPath.concat('\\', params.project_id)
                            .concat('\\', params.item_id)
                            .concat('\\', measurement.file_name);      
        measurementData = await parser.parse(filePath, measurer);
        measurementDataArray.push(measurementData);
      } catch (err) {
        console.log("Iba todo bien en el parseo, hasta que ya no", err);
      } 
    }
    
    return measurementDataArray;
  }

  public async show ({ params }: HttpContextContract) {
    let measurementDataArray = await this.commonShow(params);

    return measurementDataArray;
  }

  public async showModulus ({ params }: HttpContextContract) {
    const math = require('mathjs');
  
    let measurementDataArray = await this.commonShow(params);
    let i: number = 0;

    for(let measurementData of measurementDataArray){
      measurementData = measurementData.map(({fr, x, y}) => ({ x: fr, y: math.norm(math.complex(x, y)) }));
      measurementDataArray[i] = measurementData; 
      i++;
    }

    return measurementDataArray;
  }  

  public async showPhase ({ params }: HttpContextContract) {
    const math = require('mathjs');
    console.log(params);

    let measurementDataArray = await this.commonShow(params);
    let i: number = 0;

    for(let measurementData of measurementDataArray){
      measurementData = measurementData.map(({fr, x, y}) => ({ x: fr, y: math.atan2(y,x) }));
      measurementDataArray[i] = measurementData; 
      i++;
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
