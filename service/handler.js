'use strict';
const cuid = require("cuid");
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "notes";
const headers = {
  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
};

module.exports.getNote = (event, context, callback) => {
  const { note_id } = event.pathParameters;

  const params = {
    TableName: "notes",
    Key: {
      "id": note_id
    }
  };

  docClient.get(params, (err, data) => {
    let response = { headers };
    if (err) {
      response = Object.assign({}, response, { statusCode: 500, body: JSON.stringify(err)});
    } else {
      response = Object.assign({}, response, { statusCode: 200, body: JSON.stringify({ data })})
    }

    callback(null, response);
  });
};

module.exports.getNotes = (event, context, callback) => {
 var params = { TableName: TABLE_NAME };

  docClient.scan(params, (err, data) => {
    let response = { headers };
    if (err) {
      response = Object.assign({}, response, { statusCode: 500, body: JSON.stringify(err)});
    } else {
      response = Object.assign({}, response, { statusCode: 200, body: JSON.stringify({ data: data.Items })})
    }

    callback(null, response);
  });
};

module.exports.postNote = (event, context, callback) => {
  const { body } = event;
  const { note } = JSON.parse(body);

  var params = {
    TableName : TABLE_NAME,
    Item: {
      id: cuid(),
      note
    }
  };

  docClient.put(params, (err, data) => {
    let response = { headers };
    if (err) {
      response = Object.assign({}, response, { statusCode: 500, body: JSON.stringify(err)});
    } else {
      response = Object.assign({}, response, { statusCode: 200, body: JSON.stringify({ data })})
    }

    callback(null, response);
  });
};

module.exports.deleteNote = (event, context, callback) => {
  const { note_id } = event.pathParameters;

  var params = {
    TableName : TABLE_NAME,
    Key: {
      id: note_id,
    }
  };

  docClient.delete(params, (err, data) => {
    let response = { headers };
    if (err) {
      response = Object.assign({}, response, { statusCode: 500, body: JSON.stringify(err)});
    } else {
      response = Object.assign({}, response, { statusCode: 200, body: JSON.stringify({ data })})
    }

    callback(null, response);
  });
};