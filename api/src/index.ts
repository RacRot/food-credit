import express from 'express';
import connection from './dbconnection';
import { RegisterNewUserController, LoginController } from './UserFunctions';

const APIport = process.env.API_PORT || 5001;

const server = express();
server.use(express.json());
server.use(express.urlencoded( {extended: true} ));

server.listen(
    APIport,
    () => { console.log(`***** API listening on port ===> ${APIport}`); }
)

server.post('/registerNewUser', async (req, res) => { RegisterNewUserController(req, res); });
server.post('/login', async (req, res) => { LoginController(req, res); });

connection().then(() => { console.log('***** MONGODB connected'); });