import createError from 'http-errors';
import express from 'express';
import path from 'path';
import flash from 'connect-flash';
import { config } from 'dotenv';
import session from 'express-session';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
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
import userRoute from './routes/user.route.js';

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
  path.join(__dirname, 'views', 'user'),
];

// view engine setup
app.set('views', viewsDirectories);
app.set('view engine', 'ejs');
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(
  session({
    proxy: true,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    name: 'oetete',
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Replace with your MongoDB connection string
      collectionName: 'sessions'
    })
  })
);

// Method override middleware
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/adm', dashboardRoute, statisticRoute);
app.use('/adm/data', keluargaRoute, wargaRoute, kelahiranRoute, kematianRoute, keluarRoute, masukRoute, userRoute);

// Middleware untuk menangani kesalahan 404
app.use((req, res, next) => {
  res.status(404);
  res.render('error', {
    message: 'Page Not Found',
    error: { status: 404 }
  });
});

// Middleware untuk menangani kesalahan server
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

app.listen(port, () => console.log(`listening on ${port}`));
