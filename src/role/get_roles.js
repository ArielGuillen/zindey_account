const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

// Set the DynamoDB table name
const tableName = "zindey-account-role-table"

exports.getAllItemsHandler = async (event) => {

    if (event.httpMethod !== 'GET') {
        throw new Error(`get_roles only accept GET method, you tried: ${event.httpMethod}`);
    }

    //create the response object
    const response = {
        statusCode: 200,
        body: JSON.stringify({message : "The role was updated successfully!"})
    };

    //Get the key to start the scan from the url params
    const startKey = event.pathParameters.key;

    //Create the object with the Dynamo params
    var params = {
        TableName : tableName,
        ExclusiveStartKey: {
            "id": startKey     
        },
    };
    

    try{
         
        const data = await dynamo.scan(params).promise();
        const items = data.Items;
        response.body = JSON.stringify({ 
            message: "Get Role List Successfully", 
            "lastEvaluatedKey": data.LastEvaluatedKey,
            items 
        });

    }catch( error ){
        console.log( error );
        response.body = JSON.stringify( { message: "Failed to get roles"}, error );
    }

    return response;
}
