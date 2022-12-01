var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require("sequelize");
const port = 8080

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const makeModels = [
  {
    name: 'Volkswagen',
    models: [
      'Jetta',
      'Passat',
      'Polo'
    ]
  },
  {
    name: 'BMW',
    models: [
      'Serie 1',
      'Serie 2',
      'Serie 3',
      'Serie 4',
      'Serie 5',
    ]
  }
];
var defaultUsers = ["Brad Pitt", "Ed Norton", "Denzel Washington"];
var users = defaultUsers.slice();

var sequelize = new Sequelize(
  "database",
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    // Data is stored in the file `database.sqlite` in the folder `db`.
    // Note that if you leave your app public, this database file will be copied if
    // someone forks your app. So don't use it to store sensitive information.
    storage: "./db/database.sqlite"
  }
);

let User;
let MakeModel;
let Vehicle;

sequelize
  .authenticate()
  .then(function(err) {
    console.log("Connection established.");
    // define new table: 'users'
    MakeModel = sequelize.define("makemodels", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    });

    Vehicle = sequelize.define("vehicles", {
      vin: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      model_id: {
        type: Sequelize.INTEGER
      },
      make_id: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.SMALLINT
      },
      email: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      milage: {
        type: Sequelize.FLOAT
      }
    });

    User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    setup();
  })
  .catch(function(err) {
    console.log("Unable to connect to database: ", err);
  });

  function setup() {
    MakeModel.sync({ force: true })
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
            console.log(e);
          }
        });
      });
    Vehicle.sync({ force: true })
      .then(() => {
        Vehicle.create({
          vin: '192mlksd',
          model_id: 6,
          make_id: 2,
          year: '2020',
          email: 'ealvizouri@gmail.com',
          image: 'asldkmasd',
          milage: 66321.20
        })
      });
    User.sync({ force: true }) // Using 'force: true' for demo purposes. It drops the table users if it already exists and then creates a new one.
      .then(function() {
        // Add default users to the database
        for (var i = 0; i < users.length; i++) {
          // loop through all users
          User.create({ name: users[i] }); // create a new entry in the users table
        }
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

app.get('/', function (req, res) {
  User.findAll().then(function(users) {
    // finds all entries in the users table
    res.send(users); // sends users back to the page
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})