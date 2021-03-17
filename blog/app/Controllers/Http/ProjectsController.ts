import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Project from 'App/Models/Project'

export default class ProjectsController {
  public async index ({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    await user?.preload('projects')

    return user?.projects
  }

  public async store ({ request, auth }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string( {trim: true }, [
        rules.maxLength(255)
      ]),
      description: schema.string( {trim: true }, [
        rules.maxLength(255)
      ]),
    })

    const projectDetails = await request.validate({
      schema: validationSchema,
      reporter: validator.reporters.api,
    })
    
    const project = await Project.create(projectDetails)

    //binding del proyecto nuevo con el usuario logueado
    const user = await auth.authenticate()
    //console.log(user)
    await user.related('projects').attach({
      [project.id]: {
        role: 'lider',
      }
    })

    return project
  }

  public async show ({ params }: HttpContextContract) {
    const project = await Project.find(params.project_id)
    
    return project
  }

  public async update ({ request, params }: HttpContextContract) {
    const project = await Project.findOrFail(params.project_id)

    const data = request.only(['title', 'description'])

    project.title = data.title
    project.description = data.description

    await project.save()
    
    return project
  }

  public async destroy ({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.project_id)
    
    await project.delete()
   
    return {status: "204"}
  }
}
