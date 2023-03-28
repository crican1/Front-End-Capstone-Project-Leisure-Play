import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleCollection } from '../../../api/collectionData';
import CollectionForm from '../../../components/forms/CollectionForm';

export default function EditCollection() {
  const [editCollection, setEditCollection] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCollection(firebaseKey).then(setEditCollection);
  }, [firebaseKey]);

  return (<CollectionForm obj={editCollection} />);
}
