import createError from 'http-errors';
import express from 'express';
import path from 'path';
import flash from 'connect-flash';

import { config } from 'dotenv';
import session from 'express-session';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
// import mysql from 'mysql';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import mongoDbConnect from './config/dbSessionConfig.js';

config();

mongoDbConnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRoute from './routes/index.route.js';
import dashboardRoute from './routes/dashboard.route.js';
import keluargaRoute from './routes/keluarga.route.js';
import wargaRoute from './routes/warga.route.js';
import kelahiranRoute from './routes/kelahiran.route.js';
import kematianRoute from './routes/kematian.route.js';
import keluarRoute from './routes/keluar.route.js';
import masukRoute from './routes/masuk.route.js';
import statisticRoute from './routes/statistic.route.js';

// import usersRouter from './routes/users.mjs';
// import addRouter from './routes/add.mjs';
// import statsRouter from './routes/stats.mjs';
// import datasRouter from './routes/data.mjs';

const app = express();
const port = process.env.PORT || "3001";



// Tentukan lokasi folder views
const viewsDirectories = [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views', 'keluarga'),
  path.join(__dirname, 'views', 'warga'),
  path.join(__dirname, 'views', 'kelahiran'),
  path.join(__dirname, 'views', 'kematian'),
  path.join(__dirname, 'views', 'keluar'),
  path.join(__dirname, 'views', 'masuk'),
  path.join(__dirname, 'views', 'stats'),
];

// view engine setup
app.set('views', viewsDirectories);
app.set('view engine', 'ejs');
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(session({
  secret: 'login',
  cookie: { maxAge: 3.24e+7 },  //more longer than before. 
  saveUninitialized: false,
  resave: true
}));

// Method override middleware
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);  // most top level sitemap. 
app.use('/adm', dashboardRoute, statisticRoute);  // most top level sitemap. 
app.use('/adm/data', keluargaRoute, wargaRoute, kelahiranRoute, kematianRoute, keluarRoute, masukRoute);
// app.use('/users', usersRouter);
// app.use('/tambah_data', addRouter);
// app.use('/statistics', statsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port, () => console.log(`listening on ${port}`));
