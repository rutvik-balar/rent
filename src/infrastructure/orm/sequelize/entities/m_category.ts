import { DataTypes, Model } from 'sequelize'

import { sequelize } from '..'
import { ID, ModelWithActiveArchive } from './utils'

class Category extends Model {
  public id?: number
  public name!: string
  public parent_id?: string | null
  public img_url!: string
  public is_active!: number
  public is_archive!: number
  public created_at!: Date
  public created_by!: string
  public updated_at!: Date
  public updated_by?: string
}

Category.init(
  {
    id: ID,
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ...ModelWithActiveArchive,
  },
  {
    tableName: 'm_category',
    timestamps: false,
    sequelize: sequelize,
  },
)
export default Category
