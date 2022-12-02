import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import Log from './Log.js';
import sq from './sequelize.js';

sq.getInstance();

const { urlencoded, json } = bodyParser;

const port = 8080;

var app = express();
app.use(cors());


// parse application/x-www-form-urlencoded
/* app.use(urlencoded({ extended: false })); */

// parse application/json
app.use(json());

/* app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.send(JSON.stringify(req.body, null, 2))
}); */

app.get('/makes', async function (req, res) {
  const { MakeModel } = await sq.getInstance();
  MakeModel
    .findAll({
      where: {
        parent_id: null
      },
      attributes: [
        'id',
        'name'
      ]
    })
    .then((makes) => {
      res.send(makes);
    }).catch(e => {
      res.send(e);
    });
});

app.get('/models/:parent_id', async function (req, res) {
  const { MakeModel } = await sq.getInstance();
  const { parent_id } = req.params;
  MakeModel
    .findAll({
      where: {
        parent_id
      },
      attributes: [
        'id',
        'name'
      ]
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

app.listen(port, 'localhost', () => {
  Log.success(`Vehicles server started at http://localhost:${port}`)
})