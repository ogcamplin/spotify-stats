/* Components */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { store } from '../../context/store';
import { motion } from 'framer-motion';

/* Styles */
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';

const Navbar = () => {
  const context = useContext(store);

  return (
    <nav className='navbar navbar-expand-sm nav navigation-bar'>
      <div className='container-lg'>
        <NavLink className='navbar-brand mr-5' to='/'>
          <motion.div className='nav-text' whileHover={{ scale: 1.1 }}>
            <img
              src={process.env.PUBLIC_URL + '/logo2.svg'}
              height='50'
              width='50'
              alt='logo'
              className='nav-img'
            />
            SpotiStats
          </motion.div>
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#collapseToggle'
          aria-controls='collapseToggle'
          aria-expanded='false'
          aria-label='Toggle nav'
        >
          <span
            className='navbar-toggler-icon'
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/menu.png)`,
            }}
          ></span>
        </button>

        <div className='collapse navbar-collapse' id='collapseToggle'>
          <div className='navbar-nav'>
            <NavLink className='nav-link' to='/tracks/short'>
              <motion.div className='nav-text' whileHover={{ scale: 1.1 }}>
                <img
                  src={process.env.PUBLIC_URL + '/track.png'}
                  alt='track'
                  className='nav-img'
                />
                Tracks
              </motion.div>
            </NavLink>

            <NavLink className='nav-link' to='/artists/short'>
              <motion.div className='nav-text' whileHover={{ scale: 1.1 }}>
                <img
                  src={process.env.PUBLIC_URL + '/artist.png'}
                  alt='artist'
                  className='nav-img'
                />
                Artists
              </motion.div>
            </NavLink>
            <motion.button
              whileHover={{ scale: 1.1 }}
              type='button'
              className='btn btn-outline-light nav-text'
              onClick={() => context.dispatch({ type: 'LOGOUT' })}
            >
              Logout
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
