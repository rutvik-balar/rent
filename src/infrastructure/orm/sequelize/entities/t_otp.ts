import { DataTypes, Model } from 'sequelize'

import { sequelize } from '..'
import { ID } from './utils'

class Otp extends Model {
  public id?: number
  public phone_number!: string
  public otp!: string
  public device_id!: string
  public created_at!: Date
  public updated_at!: Date
}

Otp.init(
  {
    id: ID,
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    device_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 't_otp',
    timestamps: false,
    sequelize: sequelize,
  },
)

export default Otp
