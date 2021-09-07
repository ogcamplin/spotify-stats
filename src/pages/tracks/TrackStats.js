/* Components */
import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../context/store';
import { NavLink, useRouteMatch, Route, Switch } from 'react-router-dom';
import { fetchTracks } from '../../context/actions.js';
import { motion } from 'framer-motion';
import TracksContainer from './TracksContainer';
import Spinner from '../../components/Spinner/Spinner';

/* Styles */
import '../StatsPage.css';
import 'bootstrap/dist/css/bootstrap.css';

const TrackStatistics = () => {
  const context = useContext(store);
  const match = useRouteMatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracks(context, setLoading);
    if (!context.state.isAuthed) {
      setLoading(false);
    }
  }, [setLoading, context]);

  const variants = {
    hover: {
      originY: 1.1,
      scale: 1.2,
      transition: { type: 'spring', duration: 0.5 },
    },
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='container track-stats'>
      <h1 className='display-6 pg-title mt-5 mb-5'>TRACKS</h1>

      <motion.div className='nav nav-fill justify-content-center date-nav'>
        <motion.div className='nav-item'>
          <NavLink className='nav-link' to={`${match.url}/short`}>
            <motion.div className='pt-1 time-text' variants={variants} whileHover='hover'>
              1 Month
            </motion.div>
          </NavLink>
        </motion.div>
        <motion.div className='nav-item'>
          <NavLink className='nav-link' to={`${match.url}/medium`}>
            <motion.div className='pt-1 time-text' variants={variants} whileHover='hover'>
              6 Months
            </motion.div>
          </NavLink>
        </motion.div>
        <motion.div className='nav-item'>
          <NavLink className='nav-link ' to={`${match.url}/long`}>
            <motion.div className='pt-1 time-text' variants={variants} whileHover='hover'>
              All Time
            </motion.div>
          </NavLink>
        </motion.div>
      </motion.div>

      <Switch>
        <Route path={`${match.path}/:range`} component={TracksContainer} />
        <Route path={`${match.path}`} component={TracksContainer} />
      </Switch>
    </div>
  );
};

export default TrackStatistics;
