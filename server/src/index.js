import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import Log from './Log.js';
import sq from './sequelize.js';
import { makesRoutes, modelsRoutes, vehiclesRoutes } from './routes.js';

sq.getInstance();

const { urlencoded, json } = bodyParser;

const port = 8080;

var app = express();
app.use(express.static('public'))
app.use(cors());


// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }));

// parse application/json
app.use(json());

app.use(makesRoutes);
app.use(modelsRoutes);
app.use(vehiclesRoutes);

app.get('/', function (req, res) {
  res.send('Vehicles API works!');
});

app.listen(port, 'localhost', () => {
  Log.success(`Vehicles server started at http://localhost:${port}`);
});