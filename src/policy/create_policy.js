const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const uuid = require('uuid');

// Set the DynamoDB table name
const tableName = "zindey-account-policy-table"

exports.lambdaHandler = async (event) => {

    if (event.httpMethod !== 'POST')
        throw new Error(`create_policy only accepts POST method, you tried: ${event.httpMethod} method.`);

    //create the response object
    const response = {
        statusCode: 200,
        body: JSON.stringify({ message: "The policy was created successfully!" })
    };

    // Get and convert data from the body of the request
    const { name } = JSON.parse(event.body);

    //Generate an id for the new role using uuid v4
    const id = uuid.v4();

    // Create an object with the DynamoDB parameters 
    // Item is the new object
    var params = {
        TableName: tableName,
        Item: {
            id,
            name
        }
    };
    try {

        const result = await dynamo.put(params).promise();
        response.body = JSON.stringify({ message: `Policy ${name} created successfully` }, result);

    } catch (error) {
        console.log(error);
        response.body = JSON.stringify({ message: "Failed to create policy" }, error.Error );
    }

    return response;
};
