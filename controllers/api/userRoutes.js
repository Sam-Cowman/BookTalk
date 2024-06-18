const router = require('express').Router();
const { User } = require('../../models');
const spellchecker = require('simple-spellchecker');

// Function to check and correct spelling of the text
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

// Route to handle user signup
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    checkSpelling(username, async (correctedUsername) => {
      const userData = await User.create({
        username: correctedUsername,
        email,
        password,
      });

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;