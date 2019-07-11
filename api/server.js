const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan");

const actions = require('../data/routers/actions'); //initialise routers
const projects = require('../data/routers/projects'); //initialise routers

const server = express(); //start the server

server.use(helmet()); // 3rd party security for headers. Hides x powered by Express
server.use(express.json()); //read/write json
server.use(morgan("dev")); //3rd party logger

//Allow cross origin access
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use('/api/actions', actions);
server.use('/api/projects', projects);


server.get('/', (req, res) => {
  res.status(200).send("welcome");
})

module.exports = server;


