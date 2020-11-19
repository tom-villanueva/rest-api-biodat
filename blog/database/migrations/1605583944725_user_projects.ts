import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserProjects extends BaseSchema {
  protected tableName = 'user_projects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE')
      table.enu('role', ['lider', 'colaborador'], { useNative: true, existingType: true, enumName: 'rol_type' }) //useNative para usar el Type en POSTGRESQL
      table.unique(['user_id', 'project_id', 'role'])     
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
