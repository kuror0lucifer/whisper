import { DataTypes } from "sequelize";
import { Column, Table, Model } from "sequelize-typescript";

@Table({
  tableName: "favourites",
  timestamps: false,
  underscored: true,
})
export class Favourites extends Model {
  @Column(DataTypes.BIGINT)
  user_id: number;
  @Column(DataTypes.BIGINT)
  game_id: number;
  @Column(DataTypes.BOOLEAN)
  got_reminder: boolean;
  @Column(DataTypes.BOOLEAN)
  on_sale: boolean;
}
