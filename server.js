// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { response } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req, res){
  var now = new Date();
  return res.json({"unix": now.getTime() ,  "utc": now.toUTCString() });
})

let responseObj = {}

app.get("/api/:date?", function(req, res){
  var num = /[0-9]/g;
  var isNum = num.test(req.params.date);
  var date_string = req.params.date;
  if(isNum){
    if(date_string.includes("-") || date_string.includes(" ")){
      responseObj['unix'] = new Date(date_string).getTime() ;
      responseObj['utc'] =  new Date(date_string).toUTCString();
    } else {
      if (/\d{5,}/.test(date_string)){
        date_string = parseInt(date_string);
        responseObj['unix'] = date_string;
        responseObj['utc'] = new Date(date_string).toUTCString();
      }
    }
  }
  
  if(date_string.toString() === "Invalid Date" || !isNum) {
    res.json({ error : "Invalid Date" });
    res.end();
  } else{
    res.json(responseObj);
    res.end();
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});