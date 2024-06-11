// controllers/api/bookRoutes.js
const router = require('express').Router();
const { Books } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newBooks = await Books.create(req.body);
    res.status(200).json(newBooks);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const booksData = await Books.findAll();
    res.status(200).json(booksData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;