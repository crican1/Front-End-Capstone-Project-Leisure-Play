import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;
const apiKey = clientCredentials.rawgApiKey;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/game/.json`, {
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

const createGame = (payload) => new Promise((resolve, reject) => {
  fetch(`https://api.rawg.io/api/games?key=22d748d8c7794d06acce37f48a22b830&search=${payload}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data.results[0]))
    .catch(reject);
});

// GET SINGLE GAME
const getSingleGame = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/game/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE GAME
const deleteSingleGame = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/game/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// UPDATE GAME
const updateGame = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/game/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getGameName = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games?key=22d748d8c7794d06acce37f48a22b830&search=${payload}.json`, {
    method: 'GET',
    headrers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data.results)))
    .then((resultsArray) => resolve((resultsArray.name.map)))
    .catch(reject);
});

const getGameApi = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games?key=${apiKey}&search=${payload.name}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getGameReviews = (gamefirebasekey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review.json?orderBy="gameId"&equalTo="${gamefirebasekey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});


const gamesByGenre = (gameFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/game.json?orderBy="genre"&equalTo="${gameFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const genres = Object.values(data).filter((item) => item.genre);
      resolve(genres);
    })
    .catch(reject);
});

export {
  getGames,
  createGame,
  getSingleGame,
  deleteSingleGame,
  updateGame,
  getGameName,
  getGameReviews,
  getGameApi,
  gamesByGenre,
};
