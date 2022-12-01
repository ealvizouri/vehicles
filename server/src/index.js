import express from 'express';
import bodyParser from 'body-parser';
import Log from './Log.js';
import { MakeModel, Vehicle } from './db.js';

const { urlencoded, json } = bodyParser;
const port = 8080


import makeModels from './seeds/makeModels.seed.js';

var app = express()

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json())
function setup() {
  MakeModel
    .sync({ force: true })
    .then(() => {
      makeModels.forEach(async item => {
        try {
          const make = await MakeModel.create({
            name: item.name
          });
          if (Array.isArray(item.models)) {
            item.models.forEach(itemModel => {
              MakeModel.create({
                parent_id: make.id,
                name: itemModel
              });
            });
          }
        } catch (e) {
          Log.error(e);
        }
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
  Vehicle
    .sync({ force: true })
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
          Log.error(err.path, err.message);
        });
      } else {
        Log.error(err);
      }
    });
  });
}

/* app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.send(JSON.stringify(req.body, null, 2))
}); */

app.get('/makes', function (req, res) {
  MakeModel
    .findAll({
      where: {
        parent_id: null
      }
    })
    .then((makes) => {
      res.send(makes);
    });
});

app.get('/models/:parent_id', function (req, res) {
  const { parent_id } = req.params;
  console.log(req.params);
  MakeModel
    .findAll({
      where: {
        parent_id
      }
    })
    .then((makes) => {
      res.send(makes);
    });
});

app.get('/vehicles', function (req, res) {
  Vehicle.findAll().then(function(vehicles) {
    // finds all entries in the users table
    res.send(vehicles); // sends users back to the page
  });
});

app.post('/vehicle', async function (req, res) {
  const { body } = req;
  try {
    const newVehicle = await Vehicle.create(body);
    res.send(newVehicle);
  } catch(err) {
    res.send(err);
  }
});

app.post('/vehicle/:id', async function ({ params, body }, res) {
  const { id } = params;
  try {
    const existingVehicle = await Vehicle.update({
      id,
      ...body
    });
    res.send(existingVehicle);
  } catch(err) {
    res.send(err);
  }
});

app.get('/', function (req, res) {
  res.send('Vehicles API works!');
});

app.listen(port, () => {
  Log.success(`Vehicles server started at http://localhost:${port}`)
})