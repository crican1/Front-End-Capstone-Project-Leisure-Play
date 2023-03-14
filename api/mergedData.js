import { getCollectionGames, getSingleCollection } from './collectionData';
import { getSingleGame } from './gameData';

const viewGameDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(firebaseKey).then((gameObj) => {
    getSingleCollection(gameObj.collection_id).then((collectionObject) => resolve({ ...gameObj, collectionObject }));
  })
    .catch(reject);
});

const viewCollectionDetails = (collectionFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleCollection(collectionFirebaseKey), getCollectionGames(collectionFirebaseKey)])
    .then(([collectionObject, gameArray]) => {
      resolve({ ...collectionObject, games: gameArray });
    }).catch((error) => reject(error));
});

export {
  viewGameDetails,
  viewCollectionDetails,
};
