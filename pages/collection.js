import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getCollections } from '../api/collectionData';
import CollectionCard from '../components/CollectionCard';

export default function ShowCollections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  const getAllCollections = () => {
    getCollections().then(setCollections);
  };

  return (
    <div>
      <Head>
        <title style={{ margin: '10px' }}>Collections</title>
      </Head>
      <h1 style={{ margin: '10px', color: 'white' }}>Collections</h1>
      {collections.map((collection) => (
        <CollectionCard key={collections.firebaseKey} collectionbj={collection} onUpdate={getAllCollections} />
      ))}
    </div>
  );
}
