const express = require('express');
const connection = require('./dbconnection');
const userfunctions = require('./UserFunctions');

const APIport = process.env.API_PORT || 5001;

const server = express();
server.use(express.json());
server.use(express.urlencoded( {extended: true} ));

server.listen(
    APIport,
    () => { console.log(`***** API listening on port ===> ${APIport}`); }
)

server.post('/registerNewUser', async (req, res) => { userfunctions.RegisterNewUser(req, res); });

connection().then(() => { console.log('***** MONGODB connected'); });