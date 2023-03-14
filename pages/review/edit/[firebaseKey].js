import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleReview } from '../../../api/reviewData';
import ReviewForm from '../../../components/forms/ReviewForm';

export default function EditReview() {
  const [editReview, setEditReview] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleReview(firebaseKey).then(setEditReview);
  }, [firebaseKey]);

  return (<ReviewForm obj={editReview} />);
}
