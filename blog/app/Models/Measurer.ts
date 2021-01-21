import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Measurement from 'App/Models/Measurement'

export default class Measurer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relaciones
  @hasMany(() => Measurement)
  public measurements: HasMany<typeof Measurement>
}
