const AWS = require('aws-sdk');

//AWS cloud settings
AWS.config.update({
    region: 'us-east-2',
  });

//Start local server with sharedDB local endpoint (DynamoDB creates a single database file named shared-local-instance.db.)
//java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
//local config settings:
// AWS.config.update({
//   region: "local",
//   endpoint: "http://localhost:8000"
// });

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const params = {
    TableName: 'Thoughts',
    KeySchema: [
      { AttributeName: 'username', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'createdAt', KeyType: 'RANGE' }, // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'username', AttributeType: 'S' },
      { AttributeName: 'createdAt', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2),
      );
    } else {
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2),
      );
    }
  });