const mongoose = require('mongoose');

const DBname = process.env.DB_NAME || 'foodcredit';
const DBport = process.env.DB_PORT || 27017;

const connectionString = `mongodb://db:${DBport}/${DBname}`;
const connection = () => { return mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}); }

module.exports = connection;