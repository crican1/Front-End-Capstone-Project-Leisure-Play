import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Head from 'next/head';
import { createReview, updateReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';
import { getGames } from '../../api/gameData';

const initialState = {
  // THIS IS THE WAY THE FORM WILL SHOP UP WHEN FIRST NAVIGATED TO.
  description: '',
  recommend: false,
  name: '',
  firebaseKey: '',
};

function ReviewForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [games, setGames] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames(user.uid).then(setGames);
    if (obj.firebaseKey) setFormInput(obj);

    // WHENEVER ONE OF THESE CHANGES THE HOOK RERUNS
  }, [obj, user]);

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
        .then(() => router.push(`/game/${formInput.name}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createReview(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateReview(patchPayload).then(() => {
          router.push(`/game/${formInput.name}`);
        });
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create Review</title>
      </Head>
      <FloatingLabel controlId="floatingSelect" label="Game Name">
        <Form.Select
          aria-label="Game Name"
          name="name"
          onChange={handleChange}
          className="mb-3"
          value={formInput.name}
          required
        >
          <option value="">Select a Game</option>
          {
            games.map((game) => (
              <option
                key={game.firebaseKey}
                value={game.firebaseKey}
              >
                {game.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <Form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Submit a review"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
        <Form.Check
          className="text-white mb-3"
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
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} A Review</Button>
      </Form>
    </>
  );
}

ReviewForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    recommend: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

ReviewForm.defaultProps = {
  obj: initialState,
};
export default ReviewForm;
