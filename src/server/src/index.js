require( 'babel-register' )({
    preset: [ 'react' ]
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var path = require('path');
path.resolve('../../some/path/to/file.txt');
path.resolve(__dirname+'../../some/path/to/file.txt');

let con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1111",
    database : "babble"
});

con.query("SELECT * FROM babble.user", function(err, rows){
    if(err) throw err;
    console.log(rows);
});

con.query("INSERT INTO babble.user VALUES (NULL, '', NULL)", function(err, res){
    if(err) throw err;
    console.log(res);
});

con.query("SELECT * FROM babble.chat", function(err, rows){
    if(err) throw err;
    console.log(rows);
});

con.query("INSERT INTO babble.chat VALUES (NULL, 1, '', CURRENT_TIMESTAMP())", function(err, res){
    if(err) throw err;
    console.log(res);
});

function chat(msg){
    con.query(
        "INSERT INTO babble.chat VALUES (NULL, 1, ?, CURRENT_TIMESTAMP())",
        [ msg ]
    );
}

function user(username){
    con.query(
        "INSERT INTO babble.user VALUES (NULL, ?, NULL)",
        [username]
    );
}

app.get('/', function(req, res){
    res.sendFile(path.resolve('temp/index.html'));
  // res.sendFile(__dirname + '../../components/chat.js');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    chat(msg);
    console.log('chatMessage', msg);
  });
});

io.on('connection', function(socket){
  socket.on('user name', function(username){
    io.emit('user name', username);
    user(username);
    console.log('Username', username);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
