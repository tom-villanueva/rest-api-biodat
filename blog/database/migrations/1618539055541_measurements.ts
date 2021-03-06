import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Measurements extends BaseSchema {
  protected tableName = 'measurements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('file_name', 255).notNullable()
      table.integer('item_id').unsigned().notNullable().references('id').inTable('items').onDelete('CASCADE')
      table.integer('measurer_id').unsigned().notNullable().references('id').inTable('measurers').onDelete('CASCADE')
      table.unique(['file_name', 'item_id'])
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
