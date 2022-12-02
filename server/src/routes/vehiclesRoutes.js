import express from 'express';
import { v4 as uuid } from 'uuid';
import multer from 'multer';
import Log from '../Log.js';
import sq from '../sequelize.js';



const storage = multer.diskStorage(
  {
      destination: '../client/public/vehicles/',
      filename: function ( { body }, file, cb ) {
        const { vin } = body;
        const ext = file.mimetype.replace('image/', '');
        if (vin) {
          cb( null, `${vin}.${ext}`);
        } else {
          cb( null, `${uuid()}.${ext}`);
        }
          //req.body is empty...
          //How could I get the new_file_name property sent from client here?
      }
  }
);

const upload = multer({
  storage: storage,
  /* dest: '../client/public/vehicles' */
});

const router = express.Router();

router.route('/vehicles')
  .get(async function (req, res) {
    const { Vehicle } = await sq.getInstance();
    Vehicle.findAll({
      attributes: ['vin', 'image', 'email', 'milage']
    }).then(function(vehicles) {
      // finds all entries in the users table
      /* vehicles.forEach() */
      res.send(vehicles); // sends users back to the page
    })
    .catch(e => {
      res.send(e);
    });
  })
  .post(upload.single('image'), async function (req, res) {
    const { body, file } = req;
    console.log({
      ...body,
      image: file.filename
    }, file);
    const { Vehicle } = await sq.getInstance();
    try {
      const newVehicle = await Vehicle.create({
        ...body,
        image: file.filename
      });
      res.send(newVehicle);
    } catch(err) {
      res.send(err);
    }
  }).put(async function ({ body }, res) {
    const { Vehicle } = await sq.getInstance();
    try {
      const existingVehicle = await Vehicle.update(body);
      res.send(existingVehicle);
    } catch(err) {
      res.send(err);
    }
  })
  .delete(async function ({ params }, res) {
    const { vim } = params;
    const { Vehicle } = await sq.getInstance();
    try {
      const existingVehicle = await Vehicle.findOne({ where: { vim } });
      if (existingVehicle) {
        existingVehicle.destroy();
      }
      res.send({ success: true, vehicle: existingVehicle });
    } catch(err) {
      res.send(err);
    }
  });

router.get('/vehicles/:vin', async function (req, res) {
  const { vin } = req.params;
  const { Vehicle } = await sq.getInstance();
  Vehicle
    .findOne({ where: { vin } }).then(function(vehicle) {
      // finds all entries in the users table
      /* vehicles.forEach() */
      console.log(vin, vehicle);
      res.send(vehicle); // sends users back to the page
    })
    .catch(e => {
      res.send(e);
    });
});

export default router;