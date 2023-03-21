import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getCollections } from '../api/collectionData';
import { viewCollectionDetails } from '../api/mergedData';
import GameCard from '../components/GameCard';

export default function ShowCollections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  const getAllCollectionGames = () => {
    viewCollectionDetails().then(setCollections);
  };

  return (
    <div>
      <Head>
        <title>Collections</title>
      </Head>
      <h1>Collections</h1>
      {collections.name?.map((game) => (
        <GameCard key={game.firebaseKey} gameObj={game} onUpdate={getAllCollectionGames} />
      ))}
    </div>
  );
}
