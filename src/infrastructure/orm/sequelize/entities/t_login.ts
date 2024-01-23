import { DataTypes, Model } from 'sequelize'

import { sequelize } from '..'
import { ID, ModelWithActive } from './utils'

class Login extends Model {
  public id!: number
  public user_id!: number
  public refresh_token!: string
  public device_id!: string
  public os?: string | null
  public device_token?: string | null
  public is_active!: boolean
  public created_at!: Date
  public created_by?: string
  public updated_at!: Date
  public updated_by?: string
}

Login.init(
  {
    id: ID,
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'm_user',
        key: 'id',
      },
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    device_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    os: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    device_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ...ModelWithActive,
  },
  {
    tableName: 't_login',
    timestamps: false,
    sequelize: sequelize,
  },
)

export default Login
