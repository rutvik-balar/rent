import { DataTypes, Model } from 'sequelize'

import { sequelize } from '..'
import { ModelWithActive } from './utils'

class Review extends Model {
  public reviewer_id!: string
  public reviewed_id!: string
  public rating!: number
  public comment!: string
  public is_active!: number
  public created_at!: Date
  public created_by!: string
  public updated_at!: Date
  public updated_by?: string
}

Review.init(
  {
    reviewer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    reviewed_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ...ModelWithActive,
  },
  {
    tableName: 't_review',
    timestamps: false,
    sequelize: sequelize,
  },
)
export default Review
