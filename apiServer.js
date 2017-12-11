var express       = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
const session     = require('express-session');
const MongoStore  = require('connect-mongo')(session);

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


//APIs
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/bookshop', {
mongoose.connect('mongodb://ashu:ashu@ds137206.mlab.com:37206/bookshop', {
  useMongoClient: true,
  /* other options */
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MONGO DB - connection error: '))


// ----->>> SET UP SESSION <<<-----
app.use(session({
  secret: 'mySecreteString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));
// SAVE TO SESSION

app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function (err) {
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
});

// GET SESSION CART API
app.get('/cart', function (req, res) {
  if(typeof(req.session.cart) !== 'undefined'){
    res.json(req.session.cart);
  }
});
//END SESSION SET UP


var Books = require('./models/books.js');

//----->>> POST BOOKS  <<<-----
app.post('/books', function (req, res) {
	var book = req.body;
	console.log("req========")
	console.log(req.body)
	Books.create(book, function (err, books) {
		if(err){
			throw err;
		}
		res.json(books);
	})
});

// ----->>> GET BOOKS  <<<-----
app.get('/books', function(req, res){
	Books.find(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	})
});

// ----->>> DELETE BOOK <<<-----
app.delete('/books/:_id', function (req, res) {
	var query = {_id: req.params._id};

	Books.remove(query, function (err, books) {
		if(err){
			throw err;
		}
		res.json(books);

	})
});

// ----->>> UPDATE BOOK <<<-----
app.put('/books/:_id', function (req, res) {
	var query 	= {_id: req.params._id};
	var book 		= req.body;
	var update 	= {
		'$set': {
			title: 				book.title,
			description: 	book.description,
			image: 				book.image,
			price: 				book.price
		}
	};
	var options	= {new: true};

	Books.findOneAndUpdate(query, update, options, function (err, books) {
		if(err){
			throw err;
		}
		res.json(books);
	})
});

// ----->>> GET BOOKS IMAGES API <<<-----
app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images';
  // REQUIRE FILE SYSTEM
  const fs = require('fs');
  // READ ALL FILES IN THE DIR
  fs.readdir(imgFolder, function(err, files) {
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    files.forEach(function(file){
      filesArr.push({name: file});
    })

    res.json(filesArr);
  })
})
//END APIs

app.listen(3001, function (err) {
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})

// // app.use('/', index);
// // app.use('/users', users);
// app.get('*', function(req, res){
// 	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// });
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
