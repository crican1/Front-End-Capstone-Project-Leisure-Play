import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function GetGameData() {
  const [gameObj, setGame] = useState([]);

  useEffect(() => {
    fetch('https://api.rawg.io/api/games?key=22d748d8c7794d06acce37f48a22b830&search=bioshock')
      .then((response) => response.json())
      .then((data) => {
        setGame(data.results[0]);
        console.warn(setGame);
        console.warn(gameObj);
        console.warn(data.results[0]);
      });
  }, []);

  return (
    <>
      <Card style={{ width: '50rem', margin: '10px' }}>
        <Card.Img variant="top" src={gameObj.background_image} alt={gameObj.name} style={{ height: '450px' }} />
        <Card.Body>
          <Card.Title>{gameObj.name}</Card.Title>
          <Card.Text>Realease Date: {gameObj.released}</Card.Text>
          <Card.Text>Genres: {gameObj.genres[0].name}</Card.Text>
          <Card.Text>Game Id: {gameObj.id}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default GetGameData;
