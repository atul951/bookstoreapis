const express = require("express");
const bodyParser = require("body-parser");
const lodash = require('lodash');


var app = express();

app.use(express.static("uploads"));
app.use(express.static("./node_modules/bootstrap/dist"));

app.use(bodyParser.urlencoded({ extended:   true }));
app.use(bodyParser.json());

var apiRouter = require("./api");
app.use(apiRouter);

app.listen(3000,() => {
	console.log("server runs");
});