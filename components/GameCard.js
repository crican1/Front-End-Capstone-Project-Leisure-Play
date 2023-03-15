import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getSingleCollection } from '../api/collectionData';
import { deleteSingleGame } from '../api/gameData';

function GameCard({ gameObj, onUpdate }) {
  const [setGameDetails] = useState([]);

  useEffect(() => {
    getSingleCollection(gameObj.firebaseKey).then(setGameDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameObj.firebaseKey]);

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameObj.name}?`)) {
      deleteSingleGame(gameObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '50rem', margin: '10px' }}>
      <Card.Img variant="top" src={gameObj.image} alt={gameObj.name} style={{ height: '450px' }} />
      <Card.Body>
        <Card.Title>{gameObj.name}</Card.Title>
        <Card.Text>{gameObj.genre}</Card.Text>
        <Card.Text>{gameObj.platform}</Card.Text>
        <Link href={`/game/${gameObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/game/edit/${gameObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisGame} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    gameId: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    genre: PropTypes.string,
    platform: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
