import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Measurer from 'App/Models/Measurer'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MeasurersController {
  public async index ({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    return await Database.query()
                         .select('name')
                         .from('measurers')
                         .where('user_id', user.id)
                         .orWhere('is_personal', false);
                        
  }

  public async store ({ request, auth }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string( {trim: true }, [
        rules.maxLength(255),
        rules.unique({
          table: 'measurers',
          column: 'name',
        })
      ]),
      isPersonal: schema.boolean.optional(),
      fr: schema.string.optional( {trim: true }, [
        rules.requiredIfExists('isPersonal'),
        rules.maxLength(2)
      ]),
      real: schema.string.optional( {trim: true }, [
        rules.requiredIfExists('isPersonal'),
        rules.maxLength(2)
      ]),
      imaginary: schema.string.optional( {trim: true }, [
        rules.requiredIfExists('isPersonal'),
        rules.maxLength(2)
      ]),
      modulus: schema.string.optional( {trim: true }, [
        rules.requiredIfExists('isPersonal'),
        rules.maxLength(2)
      ]),
      phase: schema.string.optional( {trim: true }, [
        rules.requiredIfExists('isPersonal'),
        rules.maxLength(2)
      ]),
      delimiter: schema.string.optional( {trim: true }, [
        rules.requiredIfExists('isPersonal'),
        rules.maxLength(2)
      ]),
      fromLine: schema.number.optional([
        rules.requiredIfExists('isPersonal'),
        rules.unsigned()
      ]),
    })

    const measurerDetails = await request.validate({
      schema: validationSchema,
      reporter: validator.reporters.api,
    })

    const measurer = new Measurer() 
    measurer.name = measurerDetails.name
    if(measurerDetails.fr !== undefined) {
      measurer.fr = measurerDetails.fr
    }
    if(measurerDetails.real !== undefined) {
      measurer.real = measurerDetails.real
    }
    if(measurerDetails.imaginary !== undefined) {
      measurer.imaginary = measurerDetails.imaginary
    }
    if(measurerDetails.modulus !== undefined) {
      measurer.modulus = measurerDetails.modulus
    }
    if(measurerDetails.phase !== undefined) {
      measurer.phase = measurerDetails.phase
    }
    if(measurerDetails.delimiter !== undefined) {
      measurer.delimiter = measurerDetails.delimiter
    }
    if(measurerDetails.fromLine !== undefined) {
      measurer.fromLine = measurerDetails.fromLine
    }
    //Si el measurer es personal se lo asigna al usuario
    if(measurerDetails.isPersonal === true) {
      measurer.isPersonal = measurerDetails.isPersonal
      const user = await auth.authenticate()
      await user.related('measurers').save(measurer);
    }
    else{
      measurer.isPersonal = false
      await measurer.save()
    }
    
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
