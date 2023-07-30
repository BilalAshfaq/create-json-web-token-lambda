
export const convertCredentialsStringToObject = (credentialsString) => {
    let obj = {};
    credentialsString.replace(/%20/g,' ').split('&').forEach(o => {
        let values = o.split('=');
        obj[values[0]] = values[1];
    });
    return obj;
};

export const customException = (code, message) => {
  let error = new Error(message);
  error.code = code;
  return error;
};

export const createResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body)
    };
};