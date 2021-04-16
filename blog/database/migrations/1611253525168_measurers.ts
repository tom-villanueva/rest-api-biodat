import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Measurers extends BaseSchema {
  protected tableName = 'measurers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable().unique()
      table.string('fr', 2).nullable()
      table.string('real', 2).nullable()
      table.string('imaginario', 2).nullable()
      table.string('delimitador', 2).nullable()
      table.integer('from_line').unsigned().nullable()
      table.boolean('is_personal').notNullable()
      table.integer('user_id').unsigned().nullable().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
