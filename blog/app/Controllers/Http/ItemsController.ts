import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Item from 'App/Models/Item'
import Project from 'App/Models/Project'

export default class ItemsController {
  public async index ({ params }: HttpContextContract) {
    const project = await Project.find(params.project_id)
    await project?.preload('items')
    
    return project?.items
  }

  public async store ({ request, params }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string( {trim: true }, [
        rules.maxLength(255)
      ]),
    })

    const itemDetails = await request.validate({
      schema: validationSchema,
      reporter: validator.reporters.api,
    })

    const item = new Item()
    item.title = itemDetails.title

    const project = await Project.findOrFail(params.project_id)

    await project.related('items').save(item)

    return item
  }

  public async show ({ params }: HttpContextContract) {
    const item = await Item.find(params.item_id)

    return item
  }

  public async update ({ request, params }: HttpContextContract) {
    const item = await Item.findOrFail(params.item_id)

    const data = request.only(['title'])

    item.title = data.title

    await item.save()
    
    return item
  }

  public async destroy ({ params }: HttpContextContract) {
    const item = await Item.findOrFail(params.item_id)

    await item.delete()

    return {status: 204}
  }
}
