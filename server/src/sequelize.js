import * as dotenv from 'dotenv';
import Sequelize, { INTEGER, STRING } from "sequelize";
import { defineVehicle, defineMakeModel } from './models.js';
import Log from './Log.js';
import makeModels from './seeds/makeModels.seed.js';


dotenv.config();
const { env } = process;

var sq = (function () {
  var instance;
  var MakeModel;
  var Vehicle;

  function setup() {
    MakeModel
      .sync({ force: false })
      .then(() => {
        makeModels.forEach(async item => {
          try {
            const [make, makeCreated] = await MakeModel.findOrCreate({
              where: {
                parent_id: null,
                name: item.name
              }
            });
            if (Array.isArray(item.models)) {
              item.models.forEach(async itemModel => {
                await MakeModel.findOrCreate({
                  where: {
                    parent_id: make.id,
                    name: itemModel
                  }
                });
              });
            }
          } catch (e) {
            Log.error(e);
          }
        });
        Vehicle
          .sync({ force: false })
          .then(() => {
            Vehicle.create({
              vin: '1HGBH41JXMN109186',
              model_id: 6,
              make_id: 2,
              year: '2020',
              email: 'ealvizouri@gmail.com',
              image: 'asldkmasd',
              milage: 66321.20
            })
            .catch((err) => {
              if (err.errors) {
                const { errors } = err;
                errors.forEach(err => {
                  Log.error('path: ', err.path, err.message);
                });
              } else {
                Log.error(err);
              }
            });
          });
      })
      .catch((err) => {
        if (err.errors) {
          const { errors } = err;
          errors.forEach(err => {
            Log.error(err.path, err.message);
          });
        } else {
          Log.error(err);
        }
      });
  }

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
        Vehicle = defineVehicle(sequelize, MakeModel);

        setup();
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
            sequelize: instance,
            MakeModel,
            Vehicle
          };
      }
  };
})();

export default sq;