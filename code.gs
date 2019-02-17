function getAuthType() {
//This function should return the authentication method required by the connector to authorize the 3rd-party service.
  var response = { type: 'NONE' };
  return response;

}

function getConfig(request) {
  //the getConfig() function response, you can define what configuration options users will see
  var cc = DataStudioApp.createCommunityConnector();
  var config = cc.getConfig();

  
  config.newInfo()
    .setId('instructions')
    .setText('Connect to see count of weapons in my inventory');

  return config.build();
}


//theser sets the fields you see in the Google Data Studio
function getFields(request) {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;
  
  fields.newDimension()
    .setId('name')
    .setType(types.TEXT);
  
  fields.newDimension()
    .setId('hair_color')
    .setType(types.TEXT)
    
  
  //fields.newDimension()
    //.setId('day')
    //.setType(types.YEAR_MONTH_DAY);
  
  return fields;
}

//This is a required funtion. We use the function above to abastract it a bit.
function getSchema(request) {
  var fields = getFields(request).build();
  //Logger.log(fields);
  return { schema: fields };
}


function getData(request) {
 
  // Prepare the schema for the requested fields
  var dataSchema = [];
  var fixedSchema = getSchema().schema;
  request.fields.forEach(function(field) {
    for (var i = 0; i < fixedSchema.length; i++) {
      if (fixedSchema[i].name == field.name) {
        dataSchema.push(fixedSchema[i]);
        break;
      }
    }
  });

// JSON Data. Usually this will be requested from an API.
  var url = 'https://swapi.co/api/people/?format=json';
  var response = UrlFetchApp.fetch(url);
  var parsedResponse = JSON.parse(response);
  
//Fetch and parse data from API  
  
//Create data array
var data = [];
  
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 
parsedResponse.results.forEach(function(item) {
  
//map schema names to data
  var values = [];
  // Provide values in the order defined by the schema.
    dataSchema.forEach(function(field) {
      //this is schema field names
      switch (field.name) {
      case 'name':
        values.push(item.name);
        break;
      case 'hair_color':
        values.push(item.hair_color);
        break;
      default:
        values.push('');
      }
    });
    data.push({
      values: values
    });
  });
  
  
/*
return {
    schema: <filtered schema>,
    rows: <transformed and filtered data>
  };*/
return {
    schema: dataSchema,
    rows: data
  }; 
  
  
  
  
  
  
}
