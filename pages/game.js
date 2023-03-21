import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getGames } from '../api/gameData';
import GenreFilter from '../components/Filter';
import GameCard from '../components/GameCard';

export default function ShowGames() {
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
        <title>Games</title>
      </Head>
      <h1>Games</h1>
      <GenreFilter />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href="/review/new" passHref>
          <Button variant="info">Create Review</Button>
        </Link>
      </div>
      {games.map((game) => (
        <GameCard key={game.firebaseKey} gameObj={game} onUpdate={getAllGames} />
      ))}
    </div>
  );
}
