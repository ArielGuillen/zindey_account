const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

// Set the DynamoDB table name
const tableName = "zindey-account-role-table"

exports.lambdaHandler = async (event) => {

    if (event.httpMethod !== 'PUT') {
        throw new Error(`update_role only accepts PUT method, you tried: ${event.httpMethod} method.`);
    }

    //create the response object
    const response = {
        statusCode: 200,
        body: JSON.stringify({message : "The role was updated successfully!"})
    };

    // Get and convert data from the body of the request
    const { 
        id, 
        name,
        policies 
    } = JSON.parse(event.body);
    
    // Create an object with the DynamoDB parameters 
    // Item is the object to update
    var params = {
        TableName : tableName,
        Item: { 
            id,
            name,
            policies
        }
    };
    try{

        const result = await dynamo.put( params ).promise();
        response.body = JSON.stringify( { message: `Role ${name} updated successfully`}, result );

    }catch( error ){
        console.log( error );
        response.body = JSON.stringify( { message: "Failed to update role"}, error); 
    }
    
    return response;
};
