/* Components */
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { store } from '../../context/store';
import { fetchUser } from '../../context/actions';
import Spinner from '../../components/Spinner/Spinner';

/* Styles */
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';

const doAuthenticate = () => {
  const scopes = 'user-top-read user-read-private user-read-recently-played';

  window.location.href =
    'https://accounts.spotify.com/authorize?' +
    `client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}` +
    '&response_type=token' +
    `&redirect_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URI)}` +
    '&scope=' +
    encodeURIComponent(scopes);
};

const StartButton = () => {
  const variants = {
    hover: {
      scale: 1.1,
    },
  };

  return (
    <motion.div
      variants={variants}
      className='text-center mt-4'
      whileHover='hover'
    >
      <motion.button className='start-button' onClick={() => doAuthenticate()}>
        Get started
      </motion.button>
    </motion.div>
  );
};

const Home = () => {
  const context = useContext(store);
  const { user, isAuthed } = context.state;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(context, setLoading);
  }, [isAuthed, context]);

  return (
    <div className='home-page container-lg d-flex flex-column'>
      {isLoading ? (
        <Spinner />
      ) : isAuthed ? (
        <motion.div className='my-5 row'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className='col-6'
          >
            <motion.h1 className='heading-1 text-lg-start'>
              {user.display_name}
            </motion.h1>
            <motion.div className='d-flex flex-row heading-container'>
              <motion.img
                className='globe-image'
                src={process.env.PUBLIC_URL + '/globe.png'}
                height='40'
                width='40'
              />
              <motion.h2 className='heading-2 my-auto'>
                {user.country}
              </motion.h2>
            </motion.div>
            <motion.h3 className='heading-3 mt-3'>
              {user.followers.total} followers
            </motion.h3>

            <div className='d-flex justify-content-center my-5'>
              { user.images[0].url? 
              <div
                className='profile-image'
                style={{ background: `url(${user.images[0].url}) 50% 50%` }}
              ></div> : <div></div>
              }
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className='my-5 d-flex flex-column'>
          <div className='d-flex flex-row justify-content-start align-items-center'>
            <h1 className='heading-1 text-lg-start mr-5'>Welcome.</h1>
            <img
              src={process.env.PUBLIC_URL + '/sound.png'}
              alt='sound'
              height='400'
              width='400'
            />
          </div>
          <div className='d-flex flex-column'>
            <h4>
              Spotify Stats provides a platform to see your top tracks and
              artists from your listening history on spotify!
            </h4>
            <StartButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
