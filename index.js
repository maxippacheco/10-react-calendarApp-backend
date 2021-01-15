//configurar express
const express = require('express');

//configurar variables de entorno
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config')


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());


//Directorio public / mostrar html
app.use( express.static('public'));

//Lectura y parseo del body
app.use( express.json() );

//Rutas => auth => crear, login, renew

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))



//Escuchar peticiones
//parametros es el puerto y el callback
app.listen( process.env.PORT, () =>{
    console.log('servidor corriendo en puerto');
});




