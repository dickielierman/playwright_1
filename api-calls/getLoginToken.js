import * as nodeFetch from 'node-fetch';
export const getLoginToken = async (username, password) => {
  const resp = await nodeFetch('http://localhost:2221/api/login', {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
  });
  if (resp.status !== 200) {
    throw new Error('An error occured trying to fetch the login token.' + resp);
  }
  const body = await resp.json();
  return body.token;
};
