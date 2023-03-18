import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCollections = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collection.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createCollection = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collection.json`, {
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

const getSingleCollection = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collection/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleCollection = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collection/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateCollection = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collection/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCollectionGames = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/collection.json?orderBy="collection_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getCollections,
  createCollection,
  getSingleCollection,
  deleteSingleCollection,
  updateCollection,
  getCollectionGames,
};
