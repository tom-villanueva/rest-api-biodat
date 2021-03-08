import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UnathorizedProjectAccessException from 'App/Exceptions/UnathorizedProjectAccessException'

export default class ProjectAuth {
  public async handle ({ auth, params }: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    const user = await auth.authenticate()
    const projectId = params.project_id    

    //devuelve un array de proyectos de un usuario con rol que ocupa en el mismo
    const user_projects = await Database.query()
      .select('project_id', 'role')
      .from('user_projects')
      .where({
        user_id: user.id,
        project_id: projectId,
      })
      .andWhereIn('role', allowedRoles)

    //si el array está vacío, entonces el usuario no pertenece al proyecto
    if(user_projects[0] == null){
      throw new UnathorizedProjectAccessException('error no puede acceder a este dashboard')
    }

    await next()
  }
}
