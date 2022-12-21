var express = require('express');
var cors = require('cors');
// var Contract = require('web3-eth-contract');

var app = express();

app.use(express.static('public'));
app.use(cors())
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/scripts', express.static(__dirname + '/node_modules/web3.js-browser/build'));

var server = require('http').Server(app);

var io = require('socket.io')(server)
server.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

/*==== Mongoose password: NPJZaCnAZuu0wiMg ====*/
// mongodb+srv://blockchain:<password>@cluster0.aq0ka.mongodb.net/?retryWrites=true&w=majority
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://blockchain:NPJZaCnAZuu0wiMg@cluster0.aq0ka.mongodb.net/?retryWrites=true&w=majority', function(err) {
    if (err) {
        console.log('MongoDB connected error! ' + err)
    } else {
        console.log('MongoDB connected successfully')
    }
});
// app.get('/test', (req, res) => res.send('OK'))
require('./controllers/game')(app);
