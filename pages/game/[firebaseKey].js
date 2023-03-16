import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getGameDetails } from '../../api/mergedData';
import ReviewCard from '../../components/ReviewCard';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const OnUpdateGame = () => {
    getGameDetails(firebaseKey).then(setGameDetails);
  };

  useEffect(() => {
    OnUpdateGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
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
        <Link href="/review/new" passHref>
          <Button variant="primary" className="m-2">Add Review</Button>
        </Link>
      </div>
      <div>
        <h5>
          {gameDetails.name}
        </h5>
        <div className="d-flex flex-wrap">
          {gameDetails.review?.map((review) => (
            <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={OnUpdateGame} />
          ))}
        </div>
      </div>
    </div>
  );
}
