import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createCollection, getCollectionGames, updateCollection } from '../../api/collectionData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  firebaseKey: '',
  uid: '',
};

function CollectionForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setCollection] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCollectionGames().then(setCollection);
    if (obj.firebaseKey) setFormInput(obj);
    // WHENEVER ONE OF THESE CHANGES THE HOOK RERUNS.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj, user]);

  // WHENEVER ONE OF THESE CHANGES THE HOOK RERUNS.
  // eslint-disable-next-line react-hooks/exhaustive-deps

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

    if (obj.firebaseKey) {
      updateCollection(formInput)
        .then(() => Router.push('/collection'));
    } else {
      // IF YOU ARE ENTERING A NEW OBJECT.
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
            placeholder="Enter name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} A Collection</Button>
      </Form>
    </>
  );
}

CollectionForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

CollectionForm.defaultProps = {
  obj: initialState,
};
export default CollectionForm;
