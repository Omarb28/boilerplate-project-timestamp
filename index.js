// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// date endpoint
app.get("/api/:date?", function (req, res) {
	let input = req.params.date;
	let date;
	
	if (input === undefined) {
		date = new Date(Date.now());
	}
	else {
		date = new Date(req.params.date);

		if (date.toString() === 'Invalid Date') {
			date = new Date(parseInt(req.params.date));

			if (date.toString() === 'Invalid Date') {
				res.json({ error: 'Invalid Date' })
			}
		}
	}
	
	let unix = date.getTime();
	let utc = date.toUTCString();
	
	res.json({
		unix: unix,
		utc: utc
	});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
