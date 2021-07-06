/* Components */
import React, { useEffect, useContext, useState } from 'react';
import { store } from '../context/store';
import { NavLink, useRouteMatch, Route, Switch } from 'react-router-dom';
import { fetchTracks } from '../context/actions.js'
import { motion } from 'framer-motion';
import TracksContainer from './TracksContainer';

/* Styles */
import '../StatsPage.css';
import 'bootstrap/dist/css/bootstrap.css';

const TrackStatistics = () => {
    const context = useContext(store);
    const match = useRouteMatch();
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
        fetchTracks(context, setLoading);
        if(!context.state.isAuthed) {
            setLoading(false);
        }
    }, [setLoading, context])

    const variants = {
        hover: {
            scale: 1.3, 
            originY: 1, 
            transition: { type: 'spring', duration: 0.5 }
        }
    }

    return isLoading ?
        ( <div className='spinner-border' style = {{ position: "fixed", top: "50%", left: "50%", color: '#ffffff' }} /> )
        : 
        (
        <div className='container track-stats my-5'>
            <h1 className='display-6 pg-title py-2'>TRACKS</h1>

            <motion.div className='nav nav-fill justify-content-center'>
                <motion.div className='nav-item'>
                    <NavLink className='nav-link' to={`${match.url}/short`}><motion.div variants={variants} whileHover='hover'>1 Month</motion.div></NavLink>
                </motion.div>
                <motion.div className='nav-item'>
                    <NavLink className='nav-link' to={`${match.url}/medium`}><motion.div variants={variants} whileHover='hover'>6 Months</motion.div></NavLink>
                </motion.div>
                <motion.div className='nav-item'>
                    <NavLink className='nav-link' to={`${match.url}/long`}><motion.div variants={variants} whileHover='hover'>All Time</motion.div></NavLink>
                </motion.div>
            </motion.div>

            <Switch>
                <Route path={`${match.path}/:range`} component={ TracksContainer }/>   
                <Route path={`${match.path}`} component={ TracksContainer }/>
            </Switch>
        </div>    
    );
}

export default TrackStatistics;