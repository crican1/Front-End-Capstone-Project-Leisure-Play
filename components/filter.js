import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { gamesByGenre } from '../api/gameData';

export default function GenreFilter() {
  const [games, setGames] = useState([]);

  const getAllGamesByGenre = () => {
    gamesByGenre().then(setGames);
  };

  useEffect(() => {
    getAllGamesByGenre();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGames((prevState) => ({

      // TAKES WHATEVER THE PREVIOUS VALUE WAS.
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <FloatingLabel controlId="floatingSelect" label="Game Genre">
      <Form.Select
        aria-label="Genre"
        name="genre"
        onChange={handleChange}
        className="mb-3"
        value={games.genre}
        required
      >
        <option value="">Select a Genre</option>
        {
        games.map((game) => (
          <option
            key={game.genre.firebaseKey}
            value={game.genre.firebaseKey}
          >
            {game.genre}
          </option>
        ))
      }
      </Form.Select>
    </FloatingLabel>
  );
}
