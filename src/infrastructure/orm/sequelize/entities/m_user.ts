import { DataTypes, Model } from 'sequelize'

import { USER_ROLES } from '../../../configs/constants/enums'
import { sequelize } from '..'
import { ID, ModelWithActiveArchive } from './utils'

class User extends Model {
  public id?: number
  public name!: string
  public phone_number!: string
  public email?: string
  public password!: string
  public role?: USER_ROLES.USER | USER_ROLES.ADMIN | USER_ROLES.SUPER_ADMIN
  public is_active!: number
  public created_at!: Date
  public created_by!: string
  public updated_at!: Date
  public updated_by?: string
}

User.init(
  {
    id: ID,
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        USER_ROLES.USER,
        USER_ROLES.ADMIN,
        USER_ROLES.SUPER_ADMIN,
      ),
      allowNull: false,
      defaultValue: USER_ROLES.USER,
    },
    ...ModelWithActiveArchive,
  },
  {
    tableName: 'm_user',
    timestamps: false,
    sequelize: sequelize,
  },
)

export default User
