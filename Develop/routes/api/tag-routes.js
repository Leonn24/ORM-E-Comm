const router = require('express').Router();
const { Tag, Product, } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({ include: [{model: Product}]});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Tags not found!'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, { include: [{model: Product}]});

    if (!tagData) {
      res.status(404).json({ message: 'No tags with this id found!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Tag not found!'});
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Creating Tag failed!'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Tag.update(req.body, { where: {id: req.params.id}});
    !updated[0] ? res.status(404).json({ message: 'No tags found with this id!'})
    : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'update failed!'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: {id: req.params.id}});
    !deleted ? res.status(404).json({ message: 'No tags found with this id!'})
    : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'update failed!'});
  }
});

module.exports = router;
