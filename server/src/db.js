import * as dotenv from 'dotenv';
import Sequelize, { INTEGER, STRING} from "sequelize";
import { defineVehicle, defineMakeModel } from './models.js';
import Log from './Log.js';

dotenv.config();
const { env } = process;

var SequelizeOrigin = (function () {
  var instance;
  var MakeModel;
  var Vehicle;

  async function createInstance() {
      var sequelize = new Sequelize(
        "database",
        env.USER,
        env.PASSWORD,
        {
          host: "0.0.0.0",
          dialect: "sqlite",
          pool: {
            max: 5,
            min: 0,
            idle: 10000
          },
          logging: false,
          // Data is stored in the file `database.sqlite` in the folder `db`.
          // Note that if you leave your app public, this database file will be copied if
          // someone forks your app. So don't use it to store sensitive information.
          storage: "./db/database.sqlite"
        }
      );

      try {
        const err = await sequelize.authenticate();
        console.log("Connection established.");
        MakeModel = defineMakeModel(sequelize);
        Vehicle = defineVehicle(sequelize);
      } catch(err) {
        Log.error("Unable to connect to database: ", err);
      }
      return sequelize;
  }

  return {
      getInstance: async function () {
          if (!instance) {
              instance = await createInstance();
          }
          return {
            sq: instance,
            MakeModel,
            Vehicle
          };
      }
  };
})();

export const { sq, MakeModel, Vehicle } = SequelizeOrigin.getInstance();