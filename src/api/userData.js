import { clientCredentials } from '../utils/client';
// API CALLS FOR USER DATA

const endpoint = clientCredentials.databaseURL;

const getUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/user.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// TODO: CREATE USER
const createUser = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/user.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: UPDATE USER
const updateUser = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/user/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getUser, createUser, updateUser };
