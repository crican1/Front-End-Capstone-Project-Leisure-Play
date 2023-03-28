/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div style={{ color: 'white' }}>
      <Head>
        <title>Profile</title>
      </Head>
      <h1>Profile</h1>
      <img src={user.photoURL} alt="userURL" width="100px" height="100px" />
      <h1> Name: {user.displayName}</h1>
      <hr />
      <h3> Email: {user.email}</h3>
      <hr />
      <h4> Last Login: {user.metadata.lastSignInTime}</h4>
      <hr />
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
