function getaResult() {
  // JSON Data. Usually this will be requested from an API.
  var url = 'https://swapi.co/api/people/?format=json';
  var response = UrlFetchApp.fetch(url);
  var parsedResponse = JSON.parse(response);
  //Logger.log(parsedResponse);
  var gender = parsedResponse.results[0].gender
  Logger.log(gender);
  
}


function getResults() {
  // JSON Data. Usually this will be requested from an API.
  var url = 'https://swapi.co/api/people/?format=json';
  var response = UrlFetchApp.fetch(url);
  var parsedResponse = JSON.parse(response);
  
  parsedResponse.results.forEach(function(element) {
    Logger.log(element.gender);
  }
  )
  
}
