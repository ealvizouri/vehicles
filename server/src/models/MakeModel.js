import { INTEGER, STRING } from "sequelize";

const defineMakeModel = (sequelize) => {
  return sequelize.define("makemodels", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    parent_id: {
      type: INTEGER
    },
    name: {
      type: STRING,
      unique: true
    }
  });
}

export default defineMakeModel;