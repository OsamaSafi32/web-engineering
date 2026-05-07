require('dotenv').config();

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', require('./routes/auth'));
app.use('/api/tasks', require('./routes/apiTasks'));
app.use('/tasks', require('./routes/tasks'));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/tasks');
  }

  res.render('index');
});

app.use((req, res) => {
  res.status(404).render('not-found');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Server error');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
