import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createReview, getSingleReview, updateReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  // THIS IS THE WAY THE FORM WILL SHOP UP WHEN FIRST NAVIGATED TO.
  description: '',
  firebaseKey: '',
};

function ReviewForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setReviews] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getSingleReview().then(setReviews);
    if (obj.firebaseKey) setFormInput(obj);

    // WHENEVER ONE OF THESE CHANGES THE HOOK RERUNS
  }, [obj, setReviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({

      // TAKES WHATEVER THE PREVIOUS VALUE WAS.
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // IF YOU ARE UPDATING AN EXISTING OBJECT.
    if (obj.firebaseKey) {
      updateReview(formInput)
        .then(() => router.push(`/game/${obj.firebaseKey}.json`));
    } else {
      // IF YOU ARE ENTERING A NEW OBJECT.
      const payload = { ...formInput, uid: user.uid };
      createReview(payload).then(() => {
        router.push(`/game/${obj.firebaseKey}.json`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        style={{ width: '45rem', margin: '10px', height: '150px' }}
        type="text"
        placeholder="Submit a review"
        name="description"
        value={formInput.description}
        onChange={handleChange}
        required
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} A Review</Button>
    </Form>
  );
}

ReviewForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ReviewForm.defaultProps = {
  obj: initialState,
};
export default ReviewForm;
