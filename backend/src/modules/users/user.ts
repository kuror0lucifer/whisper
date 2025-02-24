import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: false,
  underscored: true,
})
export class User extends Model {
  @Column(DataTypes.STRING)
  email: string;
  @Column(DataTypes.STRING)
  hash: string;
  @Column(DataTypes.BIGINT)
  telegram_id: number;
  @Column(DataTypes.STRING)
  name: string;
}
