const express = require('express');
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/scripts', express.static(__dirname + '/node_modules/web3.js-browser/build'))

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://blockchain:NPJZaCnAZuu0wiMg@cluster0.aq0ka.mongodb.net/?retryWrites=true&w=majority',
    err => console.log((err) ? 'MongoDB connected error: ' + err : 'MongoDB connected successfully.'))

require('./controllers/game')(app)