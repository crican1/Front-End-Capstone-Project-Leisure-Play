import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleReview } from '../../api/reviewData';

export default function ViewReview() {
  const [reviewDetails, setReviewDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const onUpdateReview = () => {
    getSingleReview(firebaseKey).then(setReviewDetails);
  };

  useEffect(() => {
    onUpdateReview();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" style={{ width: '30rem' }} />
      <div className="text-white ms-5 details">
        <h5>
          Reviews: {reviewDetails.description}
          <hr />
        </h5>
      </div>
    </div>
  );
}
