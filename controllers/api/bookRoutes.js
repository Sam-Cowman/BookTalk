// controllers/api/bookRoutes.js
const router = require('express').Router();
const { Books } = require('../../models');
const spellchecker = require('simple-spellchecker');

const checkSpelling = (text, callback) => {
  spellchecker.getDictionary('en-US', (err, dictionary) => {
    if (!err) {
      const misspelled = dictionary.spellCheck(text);
      if (!misspelled) {
        const suggestions = dictionary.getSuggestions(text);
        callback(suggestions[0] || text); // Use the first suggestion or the original text if no suggestion
      } else {
        callback(text); // No spelling errors
      }
    } else {
      callback(text); // In case of error, return the original text
    }
  });
};

router.post('/', async (req, res) => {
  try {
    const { title, author, description } = req.body;
    
    checkSpelling(title, async (correctedTitle) => {
      checkSpelling(author, async (correctedAuthor) => {
        checkSpelling(description, async (correctedDescription) => {
          const newBooks = await Books.create({
            title: correctedTitle,
            author: correctedAuthor,
            description: correctedDescription,
          });
          res.status(200).json(newBooks);
        });
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const booksData = await Books.findAll();
    res.status(200).json(booksData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
