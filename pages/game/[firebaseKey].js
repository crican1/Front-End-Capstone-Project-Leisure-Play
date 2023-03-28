/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteGameReviewsRelationship, viewGameAndReviews } from '../../api/mergedData';
import ReviewCard from '../../components/ReviewCard';
import { useAuth } from '../../utils/context/authContext';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  const { firebaseKey } = router.query;

  const OnUpdateGame = () => {
    viewGameAndReviews(firebaseKey).then(setGameDetails);
  };

  useEffect(() => {
    viewGameAndReviews(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameDetails.name}?`)) {
      deleteGameReviewsRelationship(gameDetails.firebaseKey).then(() => router.push('/game'));
    }
  };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <Head>
        <title style={{ margin: '10px' }}>{gameDetails.name}</title>
      </Head>
      <div className="d-flex flex-column" style={{ width: '30rem' }}>
        <img src={gameDetails.image} alt={gameDetails.name} />
        <hr />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          Name: {gameDetails.name}
          <hr />
          Genre: {gameDetails.genre}
          <hr />
          Platform: {gameDetails.platform}
          <hr />
        </h5>
        {gameDetails.uid === user.uid ? (
          <>
            <Link href={`/game/edit/${gameDetails.firebaseKey}`} passHref>
              <Button variant="dark">Edit</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisGame} className="m-2">
              Delete
            </Button>
          </>
        ) : null}
        <Link href={`/review/new/${gameDetails.firebaseKey}`} passHref>
          <Button variant="warning">Create Review</Button>
        </Link>
        <div style={{ color: 'black' }}>
          {gameDetails.reviews?.map((review) => (
            <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={OnUpdateGame} />
          ))}
        </div>
      </div>
    </div>
  );
}
