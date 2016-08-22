angular.module('myApp')
  .service('TimesDownload', TimesDownload);

TimesDownload.$inject = ["$http"];

function TimesDownload($http) {
  var service = {};
  service.put = put;
  service.link = link;

  function link(data) {
    $("#downloadLink").remove();
    var link1 = document.createElement('a');
    link1.setAttribute('href', "http://0.0.0.0:3000/data.csv");
    link.setAttribute('download', 'data.csv');
    link1.attribute('id', 'downloadLink');
    $(link1).html("Download");
    link1 = $(link1);
    $("#saveButtonDiv").after(link1);
  }

  function put(shortened) {
    var httpConfig = {
      methon: "PUT",
      url: "/data.csv",
      data: shortened,
      headers: {
        'content-type': 'data/csv;charset=utf-8'
      }
    }

    var httpPromise = $http.put('http://0.0.0.0:3000/data.csv', shortened	, httpConfig);
  	httpPromise.then(function success(response) {
  		console.log("Success: " + response.status + " " + response.statusText + " " + response.config.method);
  	}, function failed(response) {
  		console.log("Failure: " + response.status + " " + response.statusText + " " + response.config.method);
  	});
  }
}
