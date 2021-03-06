require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//TODO: Agregar HTTPS
//TODO: Control de ddos
//TODO: Capcha al crear cuenta (y hacer login ?)
//TODO: JWT: HttpOnly y otros metodos de seguridad
//TODO: Autoreconection to mongodb

mongoose.Promise = global.Promise;
const app = express();

//Control de acceso
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

//Formato de consultas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Bypass para cliente
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//Inicio de servicios
const connection = mongoose.connect(process.env.MONGODBURI, { useMongoClient: true }, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('MongoDb conection OK');
    app.listen(process.env.PORT, () => {
      console.log('Server ON, port:', process.env.PORT);
      console.log('The environment is', process.env.NODE_ENV);
    });
  }
});

//añadir modelos de mongodb
require('./models/User');
require('./models/Experiment');

require('./models/ExpA_Test');
require('./models/ExpA_RoundAndRelation');
require('./models/ExpA_Pauses');
require('./models/ExpA_Dictionary');

require('./models/ExpB_Test');
require('./models/ExpB_WordList');
require('./models/ExpB_RelationNodes');

//añadir rutas http
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/roomRoutes')(app);
require('./routes/expAlphaRoutes')(app);
require('./routes/expBetaRoutes')(app);
 
