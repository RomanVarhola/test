const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config');
const path = require('path');
const router = require('./routes');
const app = express();
const passport = require('passport');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(router);

require('./config/passport');

module.exports = app.listen(config.port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server is listening on ${config.port}`);
});
