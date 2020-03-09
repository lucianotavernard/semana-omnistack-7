import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import websocket from '../../services/websocket';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';

import './styles.css';

export default function Feed() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('posts');

      setFeeds(response.data);
    }

    loadPosts();
  }, []);

  useEffect(() => {
    websocket.on('post', newPost => {
      setFeeds([newPost, ...feeds]);
    });

    websocket.on('like', likedPost => {
      setFeeds(
        feeds.map(post => (post._id === likedPost._id ? likedPost : post))
      );
    });
  }, [feeds]);

  async function handleLike(id) {
    await api.post(`/posts/${id}/like`);
  }

  return (
    <section className="posts">
      {feeds.map(feed => (
        <article key={feed._id}>
          <header>
            <div className="user-info">
              <span className="author">{feed.author}</span>
              <span className="place">{feed.place}</span>
            </div>

            <img src={more} alt="Mais" />
          </header>

          <img src={feed.url} alt={feed.image} />

          <footer>
            <div>
              <button type="button" onClick={() => handleLike(feed._id)}>
                <img src={like} alt="Like" />
              </button>

              <img src={comment} alt="Comment" />
              <img src={send} alt="Send" />
            </div>

            <strong>{`${feed.likes} curtidas`}</strong>

            <p>
              {feed.description}
              <span>{feed.hashtags}</span>
            </p>
          </footer>
        </article>
      ))}
    </section>
  );
}
