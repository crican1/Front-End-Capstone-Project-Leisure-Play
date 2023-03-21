import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getGameReviews } from '../api/gameData';
import { deleteSingleReview } from '../api/reviewData';
import { useAuth } from '../utils/context/authContext';

function ReviewCard({ reviewObj, onUpdate }) {
  const { user } = useAuth();
  const [reviewDetails, setReviewDetails] = useState([]);

  useEffect(() => {
    getGameReviews(reviewDetails.firebaseKey).then(setReviewDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteThisReview = () => {
    if (window.confirm('Delete this review?')) {
      deleteSingleReview(reviewObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '35rem', margin: '10px' }}>
      <Card.Body>
        <Card.Text>{reviewObj.description}</Card.Text>
        <Card.Text>Reviewed by: {user.displayName}</Card.Text>
        <h5 className="card-text bold">{reviewObj.recommend && <span>Recommended<br /></span> }</h5>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/review/edit/${reviewObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisReview} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    description: PropTypes.string,
    recommend: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReviewCard;
