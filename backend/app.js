const express = require("express");

const app = express();

// Create a REST API (NodeJS) server that meets the following requirements:

// Route	HTTP Verb	Description
// /phones	GET	Show all phones (use the phones.json) as fake data
// /phones/:id	GET	Show a phone details

// 👇 Start handling routes here
const phones = require("../data/phones.json");

app.use("/phones", phones);

module.exports = app;
