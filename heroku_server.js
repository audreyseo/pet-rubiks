/**
 * http://usejsdoc.org/
 */

var express = require('express');
var bodyParser = require('body-parser');
var etag = require('etag');
var fs = require('fs');
var url = require('url');
var app = express();

app.use(require('etagify')());

function returnRequestedFile(response, fileName) {
	// response.sendFile(fileName, {root: __dirname}, function(err) {
	console.log("Directory: %s", __dirname);
	response.sendFile(fileName, {root: "./"}, function(err) {
		if (err) {
			console.log(err);
			response.status(err.status).end();
		} else {
			console.log("Sent: ", fileName);
		}
	});
}

app.use(bodyParser.text({type: "text/csv"}));

app.get('/pages/img/*.png',function(request, response) {
	response.append('cache-control', 'max-age=1000000000');
	var fileName = request.path;
	console.log(fileName);
	fileName = fileName.replace('pages/', "");
	response.etagify();

	var reqTag = request.get("etag");

	if (reqTag !== undefined) {
		if (reqTag === response.get("etag")) {
			response.status(304);
			console.log('Not Modified');
			response.send("Not Modified");
		} else {
			returnRequestedFile(response, fileName);
		}
	} else {
		returnRequestedFile(response, fileName);
	}
});

app.get('*/node_modules/*.min.*', function(request, response) {
	// console.log("Got a different one.");
	var path = request.path;
	path = path.replace('/pages/', "");
	returnRequestedFile(response, path);
});

app.get('*/pages/js/*', function(request, response) {
	var path = request.path;
	path = path.replace(/.*\/pages\//, "/public/");
	console.log("Requested js: %s", path);
	returnRequestedFile(response, path);
});

app.get('*/pages/css/*', function(request, response) {
	var path = request.path;
	path = path.replace(/.*\/pages\//, "/public/");
	console.log("Requested CSS: %s", path);
	returnRequestedFile(response, path);
});

app.get('*/scripts/*.min.*', function(request, response) {
	console.log("Got this one.");
	var dict = {
		'angular.min.': '/node_modules/angular/',
		'jquery.min.': '/node_modules/jquery/dist/',
		'angular-sanitize.min.': '/node_modules/angular-sanitize/',
		'angular-cookies.min.': '/node_modules/angular-cookies/',
		'tooltip.js': '/lib/bootstrap-3.3.6/js/'
	};
	var path = request.path;
	path = path.replace(/app\//, "");
	var name = path;
	name = name.replace(/^(.*\/)+((\w+\.)+\w+)$/, "$2");
	console.log('name, path: %s, %s', name, path);
	for (var key in dict) {
		if (name.match(key)) {
			console.log("Matching value: %s", dict[key]);
			path = dict[key] + name;
			console.log("New path: %s", path);
		}
	}
	returnRequestedFile(response, path);
});

app.get('*/pages/scripts/*.min.*', function(request, response) {
	var dict = {
		'angular.min.': 'node_modules/angular/',
		'jquery.min.': 'node_modules/jquery/dist/',
		'angular-sanitize.min.': 'node_modules/angular-sanitize/',
		'angular-cookies.min.': 'node_modules/angular-cookies/',
		'tooltip.js': '/lib/bootstrap-3.3.6/js/'
	};
	var path = request.path;
	path = path.replace('*/pages/', "");
	var name = path;
	name = name.replace(/(.*\/)+((\w+.)+\w+)/, "$2");
	console.log('name: %s', name);
	for (var key in dict) {
		if (name.match(key)) {
			path = dict[key] + name;
		}
	}
	returnRequestedFile(response, path);
});


app.get('css/*.css', function(request, response) {
	var path = request.path;
	returnRequestedFile(response, path);
});


app.put('*.csv', function(request, respond) {
  var body = '';
  filePath = "data.csv";
  request.on('data', function(data) {
      body += data;
  });

  request.on('end', function (){
      fs.writeFile(filePath, decodeURI(body), function() {
      respond.end();
      console.log(decodeURI(body));
    });
  });
});

app.get('/data.csv', function(req, res) {
	res.download("data.csv");
});

app.use('/', express.static('./public/'));
var herokuServer = app.listen(process.env.PORT, '0.0.0.0', function() {
	var addr = herokuServer.address();
	console.log("Listening @ http://%s:%d", addr.address, addr.port);
});
