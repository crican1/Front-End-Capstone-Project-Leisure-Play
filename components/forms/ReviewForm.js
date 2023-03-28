import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import Head from 'next/head';
import { createReview, updateReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  // THIS IS THE WAY THE FORM WILL SHOP UP WHEN FIRST NAVIGATED TO.
  description: '',
  recommend: false,
  gameId: '',
  firebaseKey: '',
};

function ReviewForm({ obj }) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [formInput, setFormInput] = useState({ ...initialState, gameId: firebaseKey });
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);

    // WHENEVER ONE OF THESE CHANGES THE HOOK RERUNS
  }, [obj, firebaseKey]);

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
    if (obj.firebaseKey) {
      updateReview(formInput)
        .then(() => router.push(`/game/${formInput.gameId}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createReview(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateReview(patchPayload).then(() => {
          router.push(`/game/${formInput.gameId}`);
        });
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create Review</title>
      </Head>
      <h1 style={{ margin: '10px', color: 'white' }}>Leave a Review</h1>
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
        <Form.Check
          className="text-white mb-3"
          style={{ margin: '10px' }}
          type="checkbox"
          id="checkbox"
          name="recommend"
          label="Recommend?"
          checked={formInput.recommend}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              recommend: e.target.checked,
            }));
          }}
        />
        <Button variant="warning" type="submit" style={{ margin: '10px' }}>{obj.firebaseKey ? 'Update' : 'Create'} Review</Button>
      </Form>
    </>
  );
}

ReviewForm.propTypes = {
  obj: PropTypes.shape({
    gameId: PropTypes.string,
    description: PropTypes.string,
    recommend: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

ReviewForm.defaultProps = {
  obj: initialState,
};
export default ReviewForm;
