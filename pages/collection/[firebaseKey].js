import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getCollectionDetails } from '../../api/mergedData';

export default function ViewCollection() {
  const [collectionDetails, setCollectionDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const OnUpdateCollection = () => {
    getCollectionDetails(firebaseKey).then(setCollectionDetails);
  };

  useEffect(() => {
    OnUpdateCollection();
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" style={{ width: '30rem' }} />
      <div className="text-white ms-5 details">
        <h5>
          Name: {collectionDetails.name}
          <hr />
        </h5>
        <Link href="/collection/[firebaseKey]" passHref>
          <Button variant="primary" className="m-2">View Collection</Button>
        </Link>
      </div>
    </div>
  );
}
