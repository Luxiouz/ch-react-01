import * as AWS from 'aws-sdk'
import errorCatcher from "./errorCatcher";
//dynamoDB
const configuration = {
    region: 'us-east-1',
    secretAccessKey: 'xxxxx',
    accessKeyId: 'xxxxx'
}

AWS.config.update(configuration)
// ENDS HERE
const docClient = new AWS.DynamoDB.DocumentClient()

export const fetchData = (tableName) => {
    var params = {
        TableName: tableName
    }

    docClient.scan(params, function (err, data) {
        if (!err) {
            console.log(data)
        } else {
            errorCatcher(err.message)
        }
    })
}

export const getItem = (tableName, fieldId, valueId, onCallback) => {
    const params = {
        TableName : tableName,
        KeyConditionExpression: '#fieldId=:valueId',
        ExpressionAttributeNames:{
            '#fieldId': fieldId
        },
        ExpressionAttributeValues: {
            ":valueId": valueId
        }
    };

    console.log("queryParams", params)

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            errorCatcher(err.message);
        } else {
            console.log("Query succeeded.");
            onCallback(data.Items);
        }
    });
};

export const putData = (tableName , data, onSuccess = null) => {
    var params = {
        TableName: tableName,
        Item: data
    }

    docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
            errorCatcher(err.message);
        } else {
            console.log('Inert in BD Success', data)
            onSuccess?.();
        }
    })
}