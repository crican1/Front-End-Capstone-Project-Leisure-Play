import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getSingleCollection } from '../api/collectionData';
import { deleteGameReviewsRelationship } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

function GameCard({ gameObj, onUpdate }) {
  const { user } = useAuth();
  const [setGameDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCollection(gameObj.firebaseKey).then(setGameDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameObj.firebaseKey]);

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameObj.name}?`)) {
      deleteGameReviewsRelationship(gameObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '50rem', margin: '10px' }}>
      <Card.Img variant="top" src={gameObj.image} alt={gameObj.name} style={{ height: '450px' }} />
      <Card.Body>
        <Card.Title>{gameObj.name}</Card.Title>
        <hr />
        <Card.Text>{gameObj.genre}</Card.Text>
        <hr />
        <Card.Text>{gameObj.platform}</Card.Text>
        <hr />
        <Link href={`/game/${gameObj.firebaseKey}`} passHref>
          <Button variant="secondary" className="m-2">View</Button>
        </Link>
        {gameObj.uid === user.uid ? (
          <>
            <Button variant="danger" onClick={deleteThisGame} className="m-2">
              Delete
            </Button>
          </>
        ) : ''}
      </Card.Body>
    </Card>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    background_image: PropTypes.string,
    name: PropTypes.string,
    genres: PropTypes.string,
    released: PropTypes.string,
    id: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default GameCard;
