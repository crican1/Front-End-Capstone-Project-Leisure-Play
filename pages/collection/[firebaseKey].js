import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewCollectionDetails } from '../../api/mergedData';
import GameCard from '../../components/GameCard';

export default function ViewCollection() {
  const [collectionDetails, setCollectionDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const OnUpdateCollection = () => {
    viewCollectionDetails(firebaseKey).then(setCollectionDetails);
  };

  useEffect(() => {
    viewCollectionDetails(firebaseKey).then(setCollectionDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <h5>Collection Name: {collectionDetails.collectionName}</h5>
      </div>
      <div>
        {collectionDetails.name?.map((collection) => (
          <GameCard key={collection.name} collectionObj={collection} onUpdate={OnUpdateCollection} />
        ))}
      </div>
    </>
  );
}
