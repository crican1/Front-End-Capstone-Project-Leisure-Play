import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createCollection, updateCollection } from '../../api/collectionData';
import { getGames } from '../../api/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  collectionName: '',
  firebaseKey: '',
  uid: '',
};

function CollectionForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setGames] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGames);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, setGames]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCollection(formInput)
        .then(() => router.push('/collection'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCollection(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCollection(patchPayload).then(() => {
          router.push('/collection');
        });
      });
    }
  };
  return (
    <>
      <Head>
        <title>Create Collection</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} A Collection</h2>
        <FloatingLabel controlId="floatinginput1" label="Collection Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a collection name"
            name="collectionName"
            value={formInput.collectionName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Button variant="warning" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Collection</Button>
      </Form>
    </>
  );
}

CollectionForm.propTypes = {
  obj: PropTypes.shape({
    collectionName: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

CollectionForm.defaultProps = {
  obj: initialState,
};

export default CollectionForm;
