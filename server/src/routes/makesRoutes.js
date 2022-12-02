import express from 'express';
import sq from '../sequelize.js';

const router = express.Router();

router.get('/makes', async function (req, res) {
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

router.get('/makes/:id', async function (req, res) {
  const { id } = req.params;
  const { MakeModel } = await sq.getInstance();
  MakeModel
    .findOne({
      where: {
        id,
        parent_id: null
      },
      attributes: [
        'id',
        'name'
      ]
    })
    .then((make) => {
      res.send(make);
    }).catch(e => {
      res.send(e);
    });
});

export default router;