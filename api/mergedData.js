import { getSingleCollection } from './collectionData';
import { getGameReviews, getGames, getSingleGame } from './gameData';

const viewGameAndReviews = (gameFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleGame(gameFirebaseKey), getGameReviews(gameFirebaseKey)])
    .then(([gameObject, gameReviewsArray]) => {
      resolve({ ...gameObject, reviews: gameReviewsArray });
    }).catch((error) => reject(error));
});

const viewCollectionDetails = (collectionfirebaseKey) => new Promise((resolve, reject) => {
  getSingleCollection(collectionfirebaseKey).then((gameObj) => {
    getGames(gameObj.name).then((gamesArray) => resolve({ ...gameObj, gamesArray }));
  })
    .catch(reject);
});

export {
  viewCollectionDetails,
  viewGameAndReviews,
};
