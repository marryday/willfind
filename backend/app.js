const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const hbs = require('hbs');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const cors = require("cors")
const uploadRouter = require('./routes/upload')
const profileRouter = require('./routes/profile');
const app = express();

// Подключаем mongoose.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/p3-w1-d5-myGame', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates', 'views'));
hbs.registerPartials(path.join(__dirname, 'templates', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------

app.use(fileUpload()); //возможность загружать файлы

//--------------------------------------
app.use(cors());

app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// Allows you to use PUT, DELETE with forms.
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use('/upload', uploadRouter)
//app.use('/', indexRouter);
app.use('/profile', profileRouter);
//app.use('/api/board', gamesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
