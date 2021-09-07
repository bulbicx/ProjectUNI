var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var passport = require('passport')
var authenticate = require('./authenticate')
const mongoose = require('mongoose')
require('dotenv').config()

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var buyPropertyRouter = require('./routes/buyPropertyRouter')
var rentPropertyRouter = require('./routes/rentPropertyRouter')
var favouriteRouter = require('./routes/favoritesRouter')
var uploadRouter = require('./routes/uploadRouter')
var contractRouter = require('./routes/contractRouter')
var reviewRouter = require('./routes/reviewRouter')
var feeRouter = require('./routes/feeRouter')
var saleRouter = require('./routes/saleRouter')
var todaySalesRouter = require('./routes/todaySalesRouter')
var minus7SaleRouter = require('./routes/minus7SaleRouter')
var minus14SaleRouter = require('./routes/minus14SaleRouter')
var minus21SaleRouter = require('./routes/minus21SaleRouter')
var minus28SaleRouter = require('./routes/minus28SaleRouter')
var minus35SaleRouter = require('./routes/minus35SaleRouter')
var contractLastMonthRouter = require('./routes/contractLastMonth')
var profitLastMonthRouter = require('./routes/profitLastMonthRouter')
var profitThisYearRouter = require('./routes/profitThisYearRouter')
var newUsersLastMonthRouter = require('./routes/newUsersLastMonth')
var customProfitRouter = require('./routes/customProfitRouter')
var customUsersRouter = require('./routes/customUsersRouter')
var customPropertyRouter = require('./routes/customPropertiesRouter')
var uploadRoutes = require('./routes/uploadRoutes')
var fileRouter = require('./routes/fileRouter')
var landlordRouter = require('./routes/landlordRouter')
var customContractRouter = require('./routes/customContractsReport')
var cors = require('cors')
const propertyRouter = require('./routes/propertyRouter')


//DB config
//coneect to Mongo
const db = process.env.MongoURI
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('Connected correctly to the server'))

// mongoose.set('useFindAndModify', false)
// mongoose.set('useCreateIndex', true)

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

//middelware
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// app.use(passport.initialize())

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use(express.static(path.join(__dirname, 'public')));


app.use('/properties-to-buy', buyPropertyRouter)
app.use('/properties-to-rent', rentPropertyRouter)
app.use('/properties', propertyRouter)
app.use('/my-favourites', favouriteRouter)
app.use('/fileUpload', fileRouter)
app.use('/contract', contractRouter)
app.use('/reviews', reviewRouter)
app.use('/fees', feeRouter)
app.use('/sales', saleRouter)
app.use('/today-sales', todaySalesRouter)
app.use('/minus-7-sales', minus7SaleRouter)
app.use('/minus-14-sales', minus14SaleRouter)
app.use('/minus-21-sales', minus21SaleRouter)
app.use('/minus-28-sales', minus28SaleRouter)
app.use('/minus-35-sales', minus35SaleRouter)
app.use('/contracts-last-month', contractLastMonthRouter)
app.use('/profit-last-month', profitLastMonthRouter)
app.use('/profit-this-year', profitThisYearRouter)
app.use('/new-users-last-month', newUsersLastMonthRouter)
app.use('/upload', uploadRoutes)
app.use('/landlords', landlordRouter)
app.use('/custom-profit-report', customProfitRouter)
app.use('/custom-users-report', customUsersRouter)
app.use('/custom-properties-report', customPropertyRouter)
app.use('/custom-contracts-report', customContractRouter)
app.use('/protected', require('./routes/protectedRouter'))
app.use('/offers', require('./routes/offerRouter'))
app.use('/viewings', require('./routes/viewingRouter'))
app.use('/notifications', require('./routes/notificationsRouter'))
app.use('/appointments', require('./routes/appointmentRouter'))
app.use('/api', require('./routes/auth'))
app.use('/all-properties', require('./routes/allProperties'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})


// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
