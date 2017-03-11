require( 'babel-register' )({
    preset: [ 'react' ]
});

import http       from 'http';
import express    from 'express';
import mysql      from 'mysql';
import bodyParser from 'body-parser';
import path      from 'path';
import mongoose from 'mongoose';

/* account */
import api from '../routes';
import Account from '../routes/account';

var cors = require('cors');
let app = express();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/babble');

app.use(cors());
app.use( bodyParser.json({ limit: '100mb' }));
app.use( bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use( express.static( __dirname + '/../' ));
app.use( '/', Account );
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something error!');
});
app.all( '*',  function( req, res, next ) {      res.setHeader( "Access-Control-Allow-Origin", "*" );     res.setHeader( "Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS" );     res.setHeader( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );     next();  })


let connection = mysql.createConnection({

    host                : 'localhost',
    user                : 'root',
    password            : '1111',
    database            : 'babble',
    multipleStatements  : true,

});

function handleDisconnect () {

    let connection = mysql.createConnection({

        host                : 'localhost',
        user                : 'root',
        password            : '1111',
        database            : 'babble',
        multipleStatements  : true,

    });

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

let server = app.listen( 3000, '0.0.0.0', function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log( "Listening at http://%s:%s", host, port );

});
