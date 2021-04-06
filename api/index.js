const express = require('express');
const connection = require('./dbconnection');

const APIport = process.env.API_PORT || 5001;

const server = express();
server.listen(
    APIport,
    () => { console.log(`***** API listening on port ===> ${APIport}`); }
)

connection().then(
    () => { console.log('***** MONGODB connected'); }
);