    //import minimist from "minimist"
    //import express from "express"
    //import {coinFlip, coinFlips, countFlips, flipACoin} from "./modules/coin.mjs"
// Require Express.js
const express = require('express')
const app = express()
const args = minimist(process.argv.slice(2))

    //console.log(args)
args["port"]
const HTTP_PORT = args.port || process.env.PORT || 19821
  
function coinFlip() {
    let chance = Math.random();
    if (chance >= .5) {
      return "heads";
    } else {
      return "tails";
    }
  }
function coinFlips(flips) {
    const record = [];
  
    if (flips == undefined) {
      flips = 1;
    }
    
    for (let i = 0; i < flips; i++) {
        record[i] = coinFlip();
    }
    return record;
  }
  function countFlips(array) {
    let flips = {tails: 0, heads: 0};
    for (let i=0; i < array.length;i++) {
      if (array[i].localeCompare("heads")==0) {
        flips.heads++;
      } else {
        flips.tails++;
      }
    }
    if (flips.heads==0) {
      delete flips.heads;
    }
    if (flips.tails==0) {
      delete flips.tails;
    }
    return flips;
  }

 function flipACoin(call) {
   let game;
    if (call == undefined) {
      console.log("Error: no input.");
      console.log("Usage: node guess-flip --call=[heads|tails]");
    } else if (!call.localeCompare("heads") || !call.localeCompare("tails")) {
      game = {call:call, flip:coinFlip(), result:'lose'}
      if (game.call.localeCompare(game.flip) == 0) {
        game.result = "win"
      }
    } else {
      console.log("Error: Invalid input");
      console.log("Usage: node guess-flip --call=[heads|tails]");
    }
  
    return game;
  }
// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Default response for any other request


    app.get('/app/', (req, res) => {
    // Respond with status 200
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });


    app.get('/app/flip/call/:call', (req, res) => {
        const call = req params.call;
        res.status(200).json(flipACoin(call))
    });
    app.get('/app/flip/', (req,res) => {
        res.status(200).json({'flip' : coinFlip()})
    })
    app.get('/app/flips/:number', (req, res) => {
        const flips = coinFlips(req.params.number)
        res.status(200).json({
        "raw":flips,
        "summary":countFlips(flips)
       })
    });

    /*app.get('/app/flip/call/heads', (req, res) => {
        res.status(200).json(flipACoin("heads"))
    });

    app.get('/app/flip/call/heads', (req, res) => {
        res.status(200).json(flipACoin("heads"))
    });
    */
    app.get('/app/echo/:number', (req,res) => {
        res.status(200).json({ 'message': req.params.number })
    })
    app.use(function(req, res){
        res.status(404).send('404 NOT FOUND')
    })