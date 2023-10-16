const express = require('express');
const { connectDb } = require('./src/utils/database');
const routeJuegos = require('./src/api/routes/juegos.routes')
const routeUsers = require('./src/api/routes/user.routes')
const env = require('dotenv');
env.config();

const cors = require('cors');

const app = express();

// Allow requests from a specific origin (change this to match your web page's origin)
const allowedOrigins = ['http://127.0.0.1:5500'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

const cloudinary = require("cloudinary").v2;

//estas configuraciones nos sirven para recibir objetos de tipo json.
app.use(express.json());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

app.get('/', (req, res) => {
    const apiLinks = `
    <ul>
    <li><a href="http://localhost:5051/juegos">Juegos</a></li>
    <li><a href="http://localhost:5051/users">Users</a></li>
    </ul>`
    res.send(`<h1>Main API Route</h1>${apiLinks}`)
});


connectDb()
app.use(express.json());
app.use('/juegos', routeJuegos);
app.use('/users', routeUsers);
 



const PORT = 5051;
app.listen(PORT, () => {
    console.log('escuchando por el puerto ' + PORT);
});

