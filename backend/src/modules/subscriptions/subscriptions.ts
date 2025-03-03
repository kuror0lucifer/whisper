import { DataTypes } from "sequelize";
import { Column, Table, Model } from "sequelize-typescript";

@Table({
  tableName: "subscriptions",
  timestamps: false,
  underscored: true,
})
export class Subscriptions extends Model {
  @Column(DataTypes.BIGINT)
  user_id: number;
  @Column(DataTypes.BIGINT)
  subscription_id: number;
}
