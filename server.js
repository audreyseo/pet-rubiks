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
	response.sendFile(fileName, {root: __dirname}, function(err) {
		if (err) {
			console.log(err);
			response.status(err.status).end();
		} else {
			console.log("Sent: ", fileName);
		}
	});
}

//function createETag(fileName) {
//	var eTag;
//	fs.readFile(fileName, function(err, buf) {
//		eTag = crypto.createHash('md5').update(buf).digest('hex');
//	});
//	return eTag;
//}

//app.put('/data.csv', function(res, req) {
//
//});

app.use(bodyParser.text({type: "text/csv"}));

app.get('/pages/img/*.png',function(request, response) {
	response.append('cache-control', 'max-age=1000000000');
	var fileName = request.path;
	console.log(fileName);
	fileName = fileName.replace('pages/', "");
	response.etagify();

	var reqTag = request.get("etag");

//	console.log("Type of ETag: " + (typeof reqTag));

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

app.get('*/jquery-ui*')

app.get('css/*.css', function(request, response) {
	var path = request.path;
	returnRequestedFile(response, path);
});

//app.get('*/build/img/*.png', function(request, response) {
//  var url = request.path;
//  url = url.replace('build/', '');
//  console.log('URL', url);
//  returnRequestedFile(response, url);
//});

app.put('*.csv', function(request, respond) {
  var body = '';
  filePath = "data.csv";
//  count = 0;
  request.on('data', function(data) {
      body += data;
//      count++;
  });
//  console.log(count);
//  console.log("");
//  console.log("");
//  console.log(body);

  request.on('end', function (){
      fs.writeFile(filePath, decodeURI(body), function() {
      respond.end();
      console.log(decodeURI(body));
    });
  });
});

//app.listen(8080);
  //
//
//send = function(req, res) {
//  req.send(res.body);
//};
//
//
//app.put('/data.csv', function (req, res) {
//  console.log(req.`body)
//  console.log(req)
//}, send);
//
app.get('/data.csv', function(req, res) {
	res.download("data.csv");
});
app.use('/', express.static('./'));
var serverRegular = app.listen(3000, '0.0.0.0', function() {
	var addr = serverRegular.address();
	console.log("Listening @ http://%s:%d", addr.address, addr.port);
});

var serverDebug = app.listen(5555, 'localhost', function() {
  var addr = serverDebug.address();
  console.log("Debug server listening @ http://%s:%d", addr.address, addr.port);
});
