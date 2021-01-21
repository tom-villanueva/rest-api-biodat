import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Item from 'App/Models/Item'
import Measurer from 'App/Models/Measurer'

export default class Measurement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public itemId: number

  @column()
  public measurerId: number

  @column()
  public file_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relaciones
  @belongsTo(() => Item)
  public item: BelongsTo<typeof Item>

  @belongsTo(() => Measurer)
  public measurer: BelongsTo<typeof Measurer>
}
