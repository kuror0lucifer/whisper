import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Favorites = sequelize.define("Favorites", {
  telegramid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "User",
      key: "telegramid",
    },
  },
  game_data: {
    type: DataTypes.JSONB, /// ???????
    allowNull: false,
  },
  gameid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Favorites;
