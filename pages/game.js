import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getGames } from '../api/gameData';
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
      {games.map((game) => (
        <GameCard key={game.firebaseKey} gameObj={game} onUpdate={getAllGames} />
      ))}
    </div>
  );
}
