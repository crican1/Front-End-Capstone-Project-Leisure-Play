import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createGame, getGames, updateGame } from '../../api/gameData';

const initialState = {
  // THIS IS THE WAY THE FORM WILL SHOP UP WHEN FIRST NAVIGATED TO.
  image: '',
  name: '',
  genre: '',
  platform: '',
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
      <h1 style={{ margin: '10px', color: 'white' }}>Create a Game</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatinginput1" label="Game Image" className="mb-3" style={{ width: '45rem', margin: '10px', height: '70px' }}>
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatinginput1" label="Game Name" className="mb-3" style={{ width: '45rem', margin: '10px', height: '70px' }}>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatinginput1" label="Genre" className="mb-3" style={{ width: '45rem', margin: '10px', height: '70px' }}>
          <Form.Control
            type="text"
            placeholder="Enter a genre"
            name="genre"
            value={formInput.genre}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Choose a Platform" style={{ width: '45rem', margin: '10px', height: '70px' }}>
          <Form.Select
            aria-label="Choose a platform"
            type="text"
            placeholder="Choose a Platform"
            name="platform"
            value={formInput.platform}
            onChange={handleChange}
            required
          >
            <option value="">Select an Option</option>
            <option value="Xbox">Xbox</option>
            <option value="Playstation">Playstation</option>
            <option value="PC">PC</option>
            <option value="Switch">Switch</option>
          </Form.Select>
        </FloatingLabel>
        <Button type="submit" style={{ margin: '10px' }}>{obj.firebaseKey ? 'Update' : 'Create'} A Game</Button>
      </Form>
    </>
  );
}

// MAKES SURE THE VALUES BEING PASSED ARE THE CORRECT TYPE.
GameForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    genre: PropTypes.string,
    platform: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};
export default GameForm;
