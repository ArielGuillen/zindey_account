const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

// Set the DynamoDB table name
const tableName = "zindey-account-policy-table"

exports.getAllItemsHandler = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`get_policies only accept GET method, you tried: ${event.httpMethod}`);
    }

    //create the response object
    const response = {
        statusCode: 200,
        body: JSON.stringify({message : "The policy was updated successfully!"})
    };

    //Create the object with the Dynamo params
    var params = {
        TableName : tableName
    };

    try{
            
        const data = await dynamo.scan(params).promise();
        const items = data.Items;
        response.body = JSON.stringify({ message: "Get policies list successfully", items });

    }catch( error ){
        console.log( error );
        response.body = JSON.stringify( { message: "Failed to get policies"}, error );
    }

    return response;
}
