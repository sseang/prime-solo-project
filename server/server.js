require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const animeRouter = require('./routes/anime.router');
const watchlistRouter = require('./routes/watchlist.router');
const genresRouter = require('./routes/genres.router');
const imageRouter = require('./routes/image.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/anime', animeRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/genres', genresRouter);
app.use('/api/photos', imageRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
