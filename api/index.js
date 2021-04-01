const http = require('http');
const express = require('express');

const backend = express();
const port = process.env.API_PORT || 3333;

const server = http.createServer(backend);

server.listen(
    port,
    () => { console.log(`***** API listening on port ===> ${port}`); }
)