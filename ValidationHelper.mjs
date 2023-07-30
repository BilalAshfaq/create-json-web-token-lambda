import { getClient } from './dbHelper.mjs';
import { customException } from './helpers.mjs';

export const validateCredentials = async (clientId, clientSecret, scope) => {
    let client;
    
    try{
        client = await getClient(clientId);
        console.log("Client ", client);
        if(!client) {
            throw new Error("Client does not exist");
        }
    }
    catch(error){
        console.error(error);
        throw customException(400, "Invalid Credentials");
    }
    
    if(client.ClientSecret !== clientSecret){
        console.log("Secret is incorrect");
        throw customException(400, "Invalid Credentials");
    }
    if(!scope.every(o => client.AllowedScopes.includes(o))){
        throw customException(400, "Invalid Scopes");
    }
}