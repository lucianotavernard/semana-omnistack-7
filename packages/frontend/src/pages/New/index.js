import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function New() {
  const history = useHistory();

  const [place, setPlace] = useState('');
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('posts', data);

    history.push('/');
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <form id="new-post" onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />

      <input
        type="text"
        placeholder="Autor do post"
        onChange={e => setAuthor(e.target.value)}
        value={author}
      />

      <input
        type="text"
        placeholder="Local do post"
        onChange={e => setPlace(e.target.value)}
        value={place}
      />

      <input
        type="text"
        placeholder="Descrição do post"
        onChange={e => setDescription(e.target.value)}
        value={description}
      />

      <input
        type="text"
        placeholder="Hashtags do post"
        onChange={e => setHashtags(e.target.value)}
        value={hashtags}
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
