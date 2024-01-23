import { DataTypes, Model } from 'sequelize'

import { sequelize } from '..'
import { ID, ModelWithActive } from './utils'

class Dummy extends Model {
  public id?: number
  public name!: string
  public email!: string
  public description?: string
  public is_active?: number
  public created_at?: Date
  public updated_at?: Date | null
  public update_by?: string | null
  public created_by?: string | null
}

Dummy.init(
  {
    id: ID,
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    ...ModelWithActive,
  },
  {
    tableName: 't_dummy',
    timestamps: false,
    sequelize: sequelize,
  },
)
export default Dummy
