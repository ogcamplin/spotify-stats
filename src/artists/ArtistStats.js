/* Components */
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useRouteMatch, Route, Switch } from 'react-router-dom'
import { store } from '../context/store';
import { motion } from 'framer-motion';
import { fetchArtists } from '../context/actions';
import ArtistsContainer from './ArtistsContainer';
import Spinner from '../application/Spinner/Spinner';

/* Styles */
import 'bootstrap/dist/css/bootstrap.css';
import '../StatsPage.css'


const ArtistStatistics = () => {
    const context = useContext(store);
    const match = useRouteMatch();
    const [isLoading, setLoading] = useState(true);

    /**
     * Gets artist data from API if context does not already contain it
     */
    useEffect(() => {
        fetchArtists(context, setLoading);
        if(!context.state.isAuthed) {
            setLoading(false);
        }
    }, [isLoading, context])

    const variants = {
        hover: {
            scale: 1.3, 
            originY: 1, 
            transition: { type: 'spring', duration: 0.5 }
        }
    }

    return isLoading ?
        ( <Spinner /> )
        : 
        (
        <div className='container track-stats my-5'>
            <h1 className='display-6 pg-title pt-2 pb-3'>ARTISTS</h1>

            <motion.div className='nav nav-fill justify-content-center'>
                <motion.div className='nav-item'>
                    <NavLink className='nav-link' to={`${match.url}/short`}><motion.div className='pt-1' variants={variants} whileHover='hover'>1 Month</motion.div></NavLink>
                </motion.div>
                <motion.div className='nav-item'>
                    <NavLink className='nav-link' to={`${match.url}/medium`}><motion.div className='pt-1' variants={variants} whileHover='hover'>6 Months</motion.div></NavLink>
                </motion.div>
                <motion.div className='nav-item'>
                    <NavLink className='nav-link' to={`${match.url}/long`}><motion.div className='pt-1' variants={variants} whileHover='hover'>All Time</motion.div></NavLink>
                </motion.div>
            </motion.div>

            <Switch>
                <Route path={`${match.path}/:range`} component={ ArtistsContainer }/>
            </Switch>
        </div>    
    );
}

export default ArtistStatistics;