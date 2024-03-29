import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getGames } from '../api/gameData';
import GameCard from '../components/GameCard';

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const getAllGames = () => {
    getGames().then(setGames);
  };

  return (
    <div>
      <Head>
        <title style={{ margin: '10px' }}>Games</title>
      </Head>
      <h1 style={{ margin: '10px', color: 'white' }}>Games</h1>
      <div style={{ margin: '10px' }}>
        <Link passHref href="/game/new">
          <Button variant="warning">Create Game</Button>
        </Link> &nbsp;&nbsp;
        <Link href="/review/new" passHref>
          <Button variant="warning">Create Review</Button>
        </Link>
      </div>
      {games.map((game) => (
        <GameCard key={game.firebaseKey} gameObj={game} onUpdate={getAllGames} />
      ))}
    </div>
  );
}

export default Home;
