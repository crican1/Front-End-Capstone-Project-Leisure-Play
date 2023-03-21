import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteSingleCollection, getSingleCollection } from '../api/collectionData';

function CollectionCard({ collectionObj }) {
  const [setCollectionDetails] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getSingleCollection(collectionObj.firebaseKey).then(setCollectionDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionObj.firebaseKey]);

  const deleteThisCollection = () => {
    if (window.confirm(`Delete ${collectionObj.collectionName}?`)) {
      deleteSingleCollection(collectionObj.firebaseKey).then(() => router.push('/collection'));
    }
  };

  return (
    <Card style={{ width: '50rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{collectionObj.collectionName}</Card.Title>
        <Link href={`/collection/${collectionObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/game/edit/${collectionObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCollection} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CollectionCard.propTypes = {
  collectionObj: PropTypes.shape({
    collectionName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default CollectionCard;
