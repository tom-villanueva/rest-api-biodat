import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Measurement from 'App/Models/Measurement'
import User from './User'

export default class Measurer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string 

  @column()
  public fr: string

  @column()
  public real: string

  @column()
  public imaginary: string
  
  @column()
  public modulus: string

  @column()
  public phase: string

  @column()
  public delimiter: string

  @column()
  public fromLine: number

  @column()
  public isPersonal: boolean

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relaciones
  @hasMany(() => Measurement)
  public measurements: HasMany<typeof Measurement>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
