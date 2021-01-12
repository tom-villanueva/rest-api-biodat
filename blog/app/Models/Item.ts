import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'
import Measurement from 'App/Models/Measurement'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public projectId: number

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relaciones
  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

  @hasMany(() => Measurement)
  public measurements: HasMany<typeof Measurement>
}
