require( 'babel-register' )({
    preset: [ 'react' ]
});

import http       from 'http';
import express    from 'express';
import mysql      from 'mysql';
import bodyParser from 'body-parser';
import path      from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectMongo from 'connect-mongo';
import passport from 'passport';

/* account */
import api from '../routes';
import Account from '../routes/account';
import Messages from '../routes/messages';

var cors = require('cors');
let app = express();

var server = http.createServer(app);
var io = require('socket.io')(server);

const MongoStore = connectMongo(session);

app.use(cors());
app.use(morgan('dev'));
app.use( bodyParser.json());
app.use( express.static( __dirname + '/../' ));
app.use( '', Account );
app.use( '', Messages);
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something error!');
});
app.use(cookieParser());

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/babble');

app.use(session({
    secret: 'BabBle$1$234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    store: new MongoStore({
        mongooseConnection : mongoose.connection,
        ttl : 60 * 60
    })
}));

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../../index.html'));
    console.log('Cookies: ', req.cookies);
});

/*Sockets*/
var usernames = [];
var rooms = ['Park', 'Choi', 'Kim'];

io.sockets.on('connection', function(socket){

    socket.on('sendmsg', function(data){
        io.sockets.in(socket.room).emit('recvmsg', socket.username, data);
    });

    var claim = function(name){
        if( !name || usernames[name] ){
            return false;
        } else {
            usernames[name] = true;
            return true;
        }
    };

    var getGuestName = function(){
        var name,
            nextUserId = 1;
        do {
            name = 'Guest' + nextUserId;
            nextUserId += 1
        } while(!claim(name));
        return name;
    };

    socket.on('userjoin', function(username){
        socket.username = username;
        socket.join(username);
    });

    /*userlist update*/
    /*var userlist = new Array();
    for( var name in usernames ){
        userlist.push(usernames[name]);
    }
    io.sockets.in(socket.room).emit('updateuser', userlist);*/

    socket.on('guestjoin', function(roomname, username){

        socket.room = roomname;

        socket.join(roomname);

        socket.emit('servernoti', 'green', 'you has connect ' + roomname);

        socket.broadcast.to(roomname).emit('servernoti', 'green', username + ' has connect to ' + roomname);
        if( roomname != 'Babble')
        socket.emit('updaterooms', rooms, roomname);
    });

    socket.on('disconnect', function(){
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('servernoti', 'red', socket.username + 'has disconnected');
        socket.leave(socket.room);
    });
});

server.listen(3000, function(){

    console.log( "Listening 3000" );
});

/*let server = app.listen( 3000, '0.0.0.0', function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log( "Listening at http://%s:%s", host, port );

});*/
