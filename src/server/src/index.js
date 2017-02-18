require( 'babel-register' )({
    preset: [ 'react' ]
});

import http       from 'http';
import express    from 'express';
import mysql      from 'mysql';
import bodyParser from 'body-parser';

import path      from 'path';

let app = express();

app.use( bodyParser.json({ limit: '100mb' }));
app.use( bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use( express.static( __dirname + '/../' ));

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
