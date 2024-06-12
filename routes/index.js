const router = require('express').Router();
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');
const clubRoutes = require('./clubRoutes');
const meetingRoutes = require('./meetingRoutes');
const homeRoutes = require('./homeRoutes');

// Use auth routes for authentication-related endpoints
router.use('/auth', authRoutes);

// Use book routes for book-related endpoints
router.use('/books', bookRoutes);

// Use club routes for club-related endpoints
router.use('/clubs', clubRoutes);

// Use meeting routes for meeting-related endpoints
router.use('/meetings', meetingRoutes);

// Use home routes for the home page
router.use('/', homeRoutes);

module.exports = router;
