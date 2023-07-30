import { getJsonWebToken } from './jwtHelper.mjs';
import { convertCredentialsStringToObject, createResponse } from './helpers.mjs';
import { validateCredentials } from './ValidationHelper.mjs';

export const handler = async(event) => {
    try{
        console.log("Event ", event);
        let requestBody = convertCredentialsStringToObject(event.body);
        console.log("Request Body ", requestBody);
        
        let scopeArray = requestBody.scope ? requestBody.scope.split(' ') : [];
        await validateCredentials(requestBody.client_id, requestBody.client_secret, scopeArray);
        let jwt = await getJsonWebToken(requestBody.client_id, scopeArray);

        return createResponse(200, { access_token: jwt });
    }
    catch(err){
        console.error(err);
        return createResponse(err.code ?? 500, err.message ?? "Internal Server Error");
    }
};
