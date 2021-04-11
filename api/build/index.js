"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const connection = require('./dbconnection');
const userfunctions = require('./UserFunctions');
const APIport = process.env.API_PORT || 5001;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.listen(APIport, () => { console.log(`***** API listening on port ===> ${APIport}`); });
server.post('/registerNewUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () { userfunctions.RegisterNewUser(req, res); }));
server.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () { userfunctions.Login(req, res); }));
connection().then(() => { console.log('***** MONGODB connected'); });
