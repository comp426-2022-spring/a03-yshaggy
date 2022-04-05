import minimist from "minimist"
import express from "express"
import {coinFlip, coinFlips, countFlips, flipACoin} from "./modules/coin.mjs"
// Require Express.js
const express = require('express')
const app = express()

const args = minimist(process.argv.slice(2))
console.log(args)
args["port"]
let HTTP_PORT = args.port || 19821
// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Default response for any other request


app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

    function coinFlip() {
        const coinSides = ["heads", "tails"];
        const random = Math.floor(Math.random() * coinSides.length);
       return coinSides[random];
    }
    app.get('/app/flip/', (req, res) => {
        res.status(200).json({"flip":coinFlip()})
    });
    app.get('/app/flips/:number', (req, res) => {
        const flips = coinFlips(req.params.number)
        res.status(200).json({
        "raw":flips,
        "summary":countFlips(flips)
       })
    });

    app.get('/app/flip/call/heads', (req, res) => {
        res.status(200).json(flipACoin("heads"))
    });

    app.get('/app/flip/call/heads', (req, res) => {
        res.status(200).json(flipACoin("heads"))
    });
    app.use(function(req, res){
        res.status(404).send('404 NOT FOUND')
    })