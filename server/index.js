// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');

require('dotenv').config({path: 'variables.env'})


// Permite comprobar la conexion a la BD
// const db = require('./config/database');
// db.authenticate()
// .then(() => console.log('DB conectada'))
// .catch(error => console.log('NO :C'));


// Configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug');

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// agregar carpeta con arch estaticos
app.use(express.static('public'));

// Validar si estamos en desarrollo o en producccion
const config = configs[app.get('env')];

// crear variable para sitio web

app.locals.titulo = config.nombresitio;

// mostrar el año actual y genera la ruta
app.use((req, res, next) => {
    let date = new Date();
    // aqui creamos una variable local del servidor
    res.locals.fecha = date.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

// Cargar el body parser (sirve para los post en los formularios)
app.use(bodyParser.urlencoded({extended: true}));


// Cargar las rutas de router
app.use('/', routes());

// Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});