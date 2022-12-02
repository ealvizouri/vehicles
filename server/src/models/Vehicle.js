import { INTEGER, STRING, SMALLINT, FLOAT } from "sequelize";
import Log from "../Log.js";

const defineVehicle = (sequelize, MakeModel) => {
  return sequelize.define("vehicles", {
    vin: {
      type: STRING,
      primaryKey: true,
      unique: {
        arg: true,
        msg: 'There\'s already a vehicle with this VIN'
      },
      allowNull: false,
      validate: {
        notNull: true,
        isAlphanumeric: true,
        isGEThanElevenLong(value) {
          if (value.length < 11) {
            throw new Error('VIN must must have at least 11 characters')
          }
        },
        isLEThanSeventeenLong(value) {
          if (value.length > 17) {
            throw new Error('VIN must must have at most 17 characters')
          }
        }
      }
    },
    make_id: {
      type: INTEGER,
      allowNull:false,
      validate: {
        notNull: true,
        isInt: true,
        exists: async function(value) {
          const make = await MakeModel.findOne({
            where: {
              id: parseInt(value),
              parent_id: null
            }
          });
          if (make === null) {
            throw new Error('The selected model doesn\' exists');
          }
        }
      }
    },
    model_id: {
      type: INTEGER,
      allowNull:false,
      validate: {
        notEmpty: true,
        isInt: true,
        exists: async function(value) {
          const model = await MakeModel.findOne({
            where: {
              id: parseInt(value)
            }
          });
          if (model === null) {
            throw new Error('The selected model doesn\'t exists');
          } else if (parseInt(model.parent_id) !== parseInt(this.make_id)) {
              Log.error(typeof model.parent_id, model.parent_id, typeof this.make_id, this.make_id);
              throw new Error('The selected model doesn\'t belong to the make');
          }
        }
      }
    },
    year: {
      type: SMALLINT,
      allowNull:false,
      validate: {
        notNull: true,
        isInt: true
      }
    },
    email: {
      type: STRING,
      allowNull:false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    image: {
      type: STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      }
    },
    milage: {
      type: FLOAT,
      allowNull:false,
      validate: {
        isFloat: true,
        min: 0
      }
    }
  })
};

export default defineVehicle;