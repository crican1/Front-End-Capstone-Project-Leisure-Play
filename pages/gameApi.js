import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteSingleGame } from '../api/gameData';

function GetGameData() {
  const [gameObj, setGame] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    fetch('https://api.rawg.io/api/games?key=22d748d8c7794d06acce37f48a22b830&search=kingdom hearts 3')
      .then((response) => response.json())
      .then((data) => {
        setGame(data.results[0]);
        console.warn(setGame);
        console.warn(gameObj);
        console.warn(data.results[0]);
      });
  }, []);

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
export default GetGameData;
