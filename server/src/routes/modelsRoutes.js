import express from 'express';
import sq from '../sequelize.js';

const router = express.Router();

router.get('/models/:parent_id', async function (req, res) {
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
    .then((models) => {
      res.send(models);
    })
    .catch(e => {
      res.send(e);
    });
});

router.get('/model/:id', async function (req, res) {
  const { MakeModel } = await sq.getInstance();
  const { id } = req.params;
  MakeModel
    .findAll({
      where: {
        id
      },
      attributes: [
        'id',
        'name'
      ]
    })
    .then((model) => {
      res.send(model);
    })
    .catch(e => {
      res.send(e);
    });
});

export default router;