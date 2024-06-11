const router = require('express').Router();
const { Books, User } = require('../models');

router.get('/', async (req, res) => {
    console.log(req.session)
    let userData = {}
    if(req.session.logged_in){
        userData = await User.findByPk(req.session.user_id)
        userData = userData.get({plain:true})
    }
    res.render ('home', {logged_in: req.session.logged_in, user:userData.username}) 
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/books', (req, res) => {
    res.render('books');
  });

module.exports = router;