# Leisure Play

- [View the Leisure Play app here.](https://leisure-play.netlify.app/)

## Topics
- [Overview](#overview)
- [MVP Features](#mvp-features)
- [Video Walkthrough of MVP](#video-walkthrough-of-mvp)
- [Relevant Links](#relevant-links)
- [Code Snippet](#code-snippet)
- [Project Screenshots](#project-screenshots)
- [Get Started](#get-started)
- [Tech and Frameworks Used](#tech-and-frameworks-used)
- [API Reference](#api-reference)
- [Contributors](#contributors)

___
## Overview
- The ideal user for Leisure Play is people who play video games and want a space to post games and let others review them and see what others think.
- Gamers can submit any game they would like and leave it open for themselves or others to submit a review on those games.
- Anyone can submit a review to any game submitted to the app but only the original submitter can edit/delete their review or game.

## MVP Features
- Allow a user to submit a game after pressing "Create Game" button using a form that takes input to generate a card for that game.
- Allow only the original submitter to edit/delete the game that was submitted.
- When a user clicks on "View Game" it takes them to the page where they can see the details of the game and any of the reviews associated with it.
- When a user clicks on "Create Review" it takes them to a form that takes input to generate a review card.
- Allow only the original submitter to edit/delete the review that was submitted.
- When a user deletes their review, it leaves the game up so others can continue to review it.
- When a user deletes a game, it deletes the game and any reviews associated with it.

## Video Walkthrough of MVP
- [Click Here for Video](https://www.loom.com/share/2fe0ffa025cd473f801c832a65c71944)

## Relevant Links
- [Visit Site](https://leisure-play.netlify.app/)
- [Wireframe for MVP](https://docs.google.com/presentation/d/1NX_zxFjV6SuAh51NIe87_6c71iLr9TQD7oO_9QXV0yM/edit)
- [MVP ERD](https://dbdiagram.io/d/63e7db05296d97641d803160)

## Code Snippet
To view the game along with the reviews associated with it.
```
const viewGameAndReviews = (gameFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleGame(gameFirebaseKey), getGameReviews(gameFirebaseKey)])
    .then(([gameObject, gameReviewsArray]) => {
      resolve({ ...gameObject, reviews: gameReviewsArray });
    }).catch((error) => reject(error));
});
```
## Project Screenshots
- [Home Page](https://photos.google.com/album/AF1QipMePQ0bMnfk_B0t_HTtu799FsuPkTNtp-zf69Yt/photo/AF1QipONxYRxqibRdcj9UmioxQoGn-BQW_lDXArU9G5b)
- [Create Game Form](https://photos.google.com/album/AF1QipMePQ0bMnfk_B0t_HTtu799FsuPkTNtp-zf69Yt/photo/AF1QipOzhFjivahFPaFDwAZo4nTk2rVSBhf9GSUUfGfg)
- [View Game Page](https://photos.google.com/album/AF1QipMePQ0bMnfk_B0t_HTtu799FsuPkTNtp-zf69Yt/photo/AF1QipPnuh27uALLJFYCI549T4ecXbURZ9Kglc7KOxpL)
- [Create Review Form](https://photos.google.com/album/AF1QipMePQ0bMnfk_B0t_HTtu799FsuPkTNtp-zf69Yt/photo/AF1QipN9gbwfws-pSMgM4U6VPXMV_wg7mf-HGOXUjiXp)

## Get Started
1. Create a Firebase project and set up authentication.
2. Clone Leisure Play to your local server
3. git@github.com:crican1/Front-End-Capstone-Project-Leisure-Play.git
4. Create a .env file at the root of the project
5. Copy the environmental variables from Firebase and paste them as the properties of the keys found in your newly created .env file
6. Import sample data found in data folder in to the Realtime Database
7. From your command line, be in the root directory and run npm install OR npm i for short
8. Then, run npm run prepare
9. To start Leisure Play, run npm run dev
10. Open http://localhost:3000 with your browser

## Tech and Frameworks Used
- React
- Next.js
- CSS
- HTML
- Bootstrap
- Netlify
- Firebase
- Github


## API Reference
- Firebase

## Contributors
- [Claudio Villalobos](https://github.com/crican1)
