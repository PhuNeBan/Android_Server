var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose'); // thêm dòng này


mongoose.connect('mongodb://localhost:27017/MD18201_AndroidServer')
  .then(() => console.log('>>>>>>>>> Connected successfully'))
  .catch(err => console.log(err));

  //chú ý thứ tự import
require('./components/categories/model');
require('./components/products/model');
require('./components/users/model');
require('./components/users/modelResetPass');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");

//vùng cấm
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); //<<<<<<<<<<<<<<<<<<<<
//vùng cấm

//http://localhost:8686/
app.use('/', indexRouter);
//http://localhost:8686/users
app.use('/users', usersRouter); 
//http://localhost:8686/products
app.use('/products', productsRouter);
//http://localhost:8686/categories
app.use('/categories', categoriesRouter);


// không sửa dòng này
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
