const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();


const port = 3000;


// Mysql
const db = mysql.createConnection ({
    
    host: 'localhost',
    user: 'root',
    password: 'bunthear',
    database: 'team'
});

db.connect((err) => {
    if (err) { throw err;}
    console.log('Connecté à la base MySQL');
});
global.db = db;


// Controller
const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const {getLogin, postLogin} = require('./routes/auth') 

// Middleware
app.set('port', process.env.port || port); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(fileUpload()); 
 

// Routes
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

app.get('/login', getLogin )
app.post('/login', postLogin )


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});