import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Favourites = sequelize.define("Favourites", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    field: "userid",
  },
  gameid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "gameid",
  },
  gotreminder: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "gotreminder",
  },
  onsale: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "onsale",
  },
});

export default Favourites;
