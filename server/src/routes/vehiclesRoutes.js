import { unlink } from 'node:fs';
import * as dotenv from 'dotenv';
import express from 'express';
import { v4 as uuid } from 'uuid';
import multer from 'multer';
import Log from '../Log.js';
import sq from '../sequelize.js';
import { readdir } from 'fs/promises';

dotenv.config();

const findFileByName = async (dir, name) => {
    const files = await readdir(dir);

    for (const file of files) {
        if (file.startsWith(`${name}.`)) {
            return file;
        }
    }

    return null;
};



const storage = multer.diskStorage(
  {
      destination: process.env.PATH_IMAGES,
      filename: async function ( { body }, file, cb ) {
        const { vin } = body;
        const ext = file.mimetype.replace('image/', '');
        if (vin) {
          const currentFile = await findFileByName(process.env.PATH_IMAGES, vin);
          if (currentFile && !currentFile.endsWith(ext)) {
            unlink(process.env.PATH_IMAGES + currentFile, (err) => {
              if (err) Log.error(err);
              else Log.success(`${currentFile} was deleted`);
            });
          }
          cb( null, `${vin}.${ext}`);
        } else {
          cb( null, `${uuid()}.${ext}`);
        }
      },
  }
);

const upload = multer({
  storage: storage,
});

const router = express.Router();

router.route('/vehicles')
  .get(async function (req, res) {
    const { Vehicle } = await sq.getInstance();
    Vehicle.findAll({
      attributes: ['vin', 'image', 'email', 'milage']
    }).then(function(vehicles) {
      res.send(vehicles); // sends users back to the page
    })
    .catch(e => {
      res.send(e);
    });
  })
  .post(upload.single('image'), async function ({ body, file }, res) {
    const { Vehicle } = await sq.getInstance();
    try {
      const newVehicle = await Vehicle.create({
        ...body,
        image: file.filename
      });
      res.send(newVehicle);
    } catch(err) {
      const errors = {};
      if (Array.isArray(err.errors)) {
        err.errors.forEach((item) => {
          errors[item.path] = item.message;
        });
      } else {
        errors.server = 'error from server';
        console.error(e);
      }
      res.status(406).send({ errors });
    }
  });

router.route('/vehicles/:vin')
  .get(async function (req, res) {
    const { vin } = req.params;
    const { Vehicle } = await sq.getInstance();
    Vehicle
      .findOne({ where: { vin } }).then(function(vehicle) {
        // finds all entries in the users table
        /* vehicles.forEach() */
        res.send(vehicle); // sends users back to the page
      })
      .catch(e => {
        res.send(e);
      });
  })
  .put(upload.single('image'), async function ({ params, body, file }, res) {
    const { Vehicle } = await sq.getInstance();
    const image = file ? file.filename : null;
    const data = {
      ...body,
      ...(image ? { image } : {})
    };
    try {
      await Vehicle.update(
        data,
        {
          where: { vin: params.vin }
        }
      );
      res.send(data);
    } catch(err) {
      const errors = {};
      if (Array.isArray(err.errors)) {
        err.errors.forEach((item) => {
          errors[item.path] = item.message;
        });
      } else {
        errors.server = 'error from server';
        console.error(e);
      }
      res.status(406).send({ errors });
    }
  })
  .delete(async function ({ params }, res) {
    const { vin } = params;
    const { Vehicle } = await sq.getInstance();
    try {
      const existingVehicle = await Vehicle.findOne({ where: { vin } });
      if (existingVehicle) {
        if (existingVehicle.image) {
          unlink(process.env.PATH_IMAGES + existingVehicle.image, (err) => {
            if (err) Log.error(err);
            else Log.success(`${existingVehicle.image} was deleted`);
          });
        }
        existingVehicle.destroy();
      }
      res.send({ success: true, vehicle: existingVehicle });
    } catch(err) {
      res.send(err);
    }
  });

export default router;