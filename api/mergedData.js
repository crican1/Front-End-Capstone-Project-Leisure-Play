import { getSingleCollection } from './collectionData';
import {
  deleteSingleGame, getGameReviews, getGames, getSingleGame,
} from './gameData';
import { deleteSingleReview } from './reviewData';

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

const deleteGameReviewsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getGameReviews(firebaseKey).then((reviewsArray) => {
    const deleteReviewPromises = reviewsArray.map((review) => deleteSingleReview(review.firebaseKey));
    Promise.all(deleteReviewPromises).then(() => {
      deleteSingleGame(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

export {
  viewCollectionDetails,
  viewGameAndReviews,
  deleteGameReviewsRelationship,
};
