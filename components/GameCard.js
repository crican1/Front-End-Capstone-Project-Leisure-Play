import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getSingleCollection } from '../api/collectionData';
import { deleteSingleGame } from '../api/gameData';

function GameCard({ gameObj }) {
  const [setGameDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCollection(gameObj.firebaseKey).then(setGameDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameObj.firebaseKey]);

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameObj.name}?`)) {
      deleteSingleGame(gameObj.firebaseKey).then(() => router.push(`/game/${firebaseKey}`));
    }
  };

  return (
    <>
      <Card style={{ width: '50rem', margin: '10px' }}>
        <Card.Img variant="top" src={gameObj.background_image} alt={gameObj.name} style={{ height: '450px' }} />
        <Card.Body>
          <Card.Text><h4>Title:</h4> {gameObj.name}</Card.Text>
          <Card.Text><h4>Genres:</h4> {gameObj.genres?.map((g) => (
            <p>{g.name}</p>
          ))}
          </Card.Text>
          <Card.Text><h4>Realease Date:</h4> {gameObj.released}</Card.Text>
          <Card.Text><h4>Game Id:</h4> {gameObj.id}</Card.Text>
          <Link href={`/game/edit/${gameObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Link href="/review/new" passHref>
            <Button variant="primary" className="m-2">Add Review</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisGame} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </>
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
