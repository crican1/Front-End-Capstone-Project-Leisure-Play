import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewGameDetails } from '../../api/mergedData';
import ReviewCard from '../../components/forms/ReviewCard';
import ReviewForm from '../../components/forms/ReviewForm';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const OnUpdateGame = () => {
    viewGameDetails(firebaseKey).then(setGameDetails);
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
      </div>
      <div>
        <ReviewForm />
      </div>
      <div>
        <ReviewCard />
      </div>
    </div>
  );
}
