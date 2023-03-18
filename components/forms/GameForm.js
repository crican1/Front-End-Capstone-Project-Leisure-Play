import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createGame, getGames, updateGame } from '../../api/gameData';

const initialState = {
  // THIS IS THE WAY THE FORM WILL SHOP UP WHEN FIRST NAVIGATED TO.
  background_image: '',
  name: '',
  genres: '',
  realeased: '',
  platform: '',
  id: '',
  firebaseKey: '',
};

function GameForm({ obj }) {
  // FIRST VALUE IS THE CURRENT STATE. SECOND VALUE IS WHAT CHANGES AND GETS UPDATED.

  const [formInput, setFormInput] = useState(initialState);
  const [setGames] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGames);
    if (obj.firebaseKey) setFormInput(obj);

    // WHENEVER ONE OF THESE CHANGES THE HOOK RERUNS.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // TAKES WHAT EVER THE PREVIOUS VALUE WAS.
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // IF YOU ARE UPDATING AN EXISTING OBJECT.
    if (obj.firebaseKey) {
      updateGame(formInput)
        .then(() => router.push('/game'));
    } else {
      // IF YOU ARE ENTERING A NEW OBJECT.
      const payload = { ...formInput, uid: user.uid };
      createGame(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGame(patchPayload).then(() => {
          router.push('/game');
        });
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create Game</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} A Game</h2>
        <FloatingLabel controlId="floatinginput1" label="Game Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Choose a Platform">
          <Form.Select
            aria-label="Choose a platform"
            type="text"
            placeholder="Choose a Platform"
            name="platform"
            value={formInput.platform}
            onChange={handleChange}
            required
          >
            <option value="Xbox">Xbox</option>
            <option value="Playstation">Playstation</option>
            <option value="PC">PC</option>
            <option value="Switch">Switch</option>
          </Form.Select>
        </FloatingLabel>
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} A Game</Button>
      </Form>
    </>
  );
}

// MAKES SURE THE VALUES BEING PASSED ARE THE CORRECT TYPE.
GameForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    genres: PropTypes.string,
    realeased: PropTypes.string,
    platform: PropTypes.string,
    id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};
export default GameForm;
