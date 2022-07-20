// import dependencies
const express = require('express')
// run liquid templating lanugage
const app = require('liquid-express-views')(express())
// request logger
const morgan = require('morgan')
// load .env file to get enviromental variables
const dotenv = require('dotenv').config()
const connectdb = require('./models/connectdb');
const methodOverride = require('method-override')
const todoRoutes = require('./controller/todo_routes')
const userRoutes = require('./controller/user_routes')
const imageRoutes = require('./controller/image_routes')
const commentRoutes = require('./controller/comment_routes')


// MIDDLEWARE
// logs out request 
app.use(morgan('tiny'))
// overrides post and get with update and delete
app.use(methodOverride('_method'))
// body parser
app.use(express.urlencoded({extended: false}))
// this serves static page on the client side
app.use(express.static('public'))
// app.use(express.static(__dirname));

// session middleware
const session = require('express-session')
const MongoStore = require('connect-mongo');
const res = require('express/lib/response');

// session middleware
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI
		}),
		saveUninitialized: true,
		resave: false
	})
);

app.use((req, res, next) => {
	res.locals.message = req.session.message;
	delete req.session.message;
	next();
})


// ROUTES
app.use('/todos', todoRoutes)
app.use('/users', userRoutes)
app.use('/images', imageRoutes)
app.use('/comments', commentRoutes)

// middleware to set up sessions

// localhost:3000/ 
app.get('/', function (req, res) {
  // res.send('Hello this is the first route that is going to be read when express runs then it will go to ROUTES')
  res.redirect('/todos')
})

app.listen(process.env.PORT || 3000)
