const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const DBname = process.env.DB_NAME || 'test';
const DBport = process.env.DB_PORT || 27017;
const APIport = process.env.API_PORT || 5001;

/****** DATABASE (to refactor) ******/
mongoose.connect(`mongodb://db:${DBport}/${DBname}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on(
    'error',
    console.error.bind(console, 'connection error:')
);
db.once(
    'open',
    () => { console.log('+++++ DB opened!'); }
);

// ------------------------------------------- //
const UserSchema = new mongoose.Schema({
    id: Number,
    email: String,
    passwordHash: String,
    username: String
    //...configs
    //  tags: []
    //  notify
    //...data
    //  brokies: []
    //  status
});

const CreditsSchema = new mongoose.Schema({
    id: Number,
    food: String,
    quantity: Number,
    quantityType: String,
    //terms
    creditor: UserSchema,
    debtor: UserSchema,
    createdAt: Date,
    closedAt: Date,
    //tags: []
    //...data
});


const backend = express();
const server = http.createServer(backend);
server.listen(
    APIport,
    () => { console.log(`***** API listening on port ===> ${APIport}`); }
)