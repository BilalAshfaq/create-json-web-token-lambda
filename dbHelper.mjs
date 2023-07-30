import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
const ddb = new DynamoDB();

export const getClient = async ( clientId ) => {
    console.log(clientId);
    let params = {
        Key: marshall({
            ClientId: clientId
        }),
        TableName: "app-clients"
    }
    
    const { Item } = await ddb.getItem(params);
    return unmarshall(Item);
}