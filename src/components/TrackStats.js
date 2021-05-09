import React, { useEffect, useContext, useState } from 'react';
import { store } from '../context/store';
import { NavLink, useRouteMatch, Route, Switch } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchTracks, fetchRecent } from '../context/actions.js'
import './StatsPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import TracksContainer from './TracksContainer';
import Spinner from '../components/Spinner';

const TrackStatistics = () => {
    const context = useContext(store);
    const match = useRouteMatch();
    const { state } = context;
    const [ isLoading, setLoading ] = useState(true);
    const [ timeFilter, setTimeFilter ] = useState('1 Month');

    useEffect(() => {
        fetchTracks(context, setLoading);
        fetchRecent(context, setLoading);
    })

    const variants = {
        hover: {
            scale: 1.3, 
            originY: 1, 
            transition: { type: 'spring', duration: 0.5 }
        },
    }

    return isLoading ?
        <Spinner />
        : 
        (   
            <div className='container track-stats'>
                <div className='d-flex flex-row align-items-center my-5'>
                    <h1 className='display-6 pg-title'>TRACKS</h1>

                    <div className='dropright ml-4'>
                        <a class='time-dropdown btn btn-lg btn-primary dropdown-toggle' href="#" role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            { timeFilter }
                        </a>
                        <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                            <NavLink className='dropdown-item' to={`${match.url}/short`} onClick={() => setTimeFilter('1 Month')}>1 Month</NavLink>
                            <NavLink className='dropdown-item' to={`${match.url}/medium`}  onClick={() => setTimeFilter('6 Months')}>6 Months</NavLink>
                            <NavLink className='dropdown-item' to={`${match.url}/long`}  onClick={() => setTimeFilter('All Time')}>All Time</NavLink>
                        </div>
                    </div>
                </div>

                <motion.div className='nav nav-fill justify-content-center'>
                    {/* <motion.div className='nav-item'>
                        <NavLink className='nav-link' to={`${match.url}/short`}><motion.div variants={variants} whileHover='hover'>1 Month</motion.div></NavLink>
                    </motion.div>
                    <motion.div className='nav-item'>
                        <NavLink className='nav-link' to={`${match.url}/medium`}><motion.div variants={variants} whileHover='hover'>6 Months</motion.div></NavLink>
                    </motion.div>
                    <motion.div className='nav-item'>
                        <NavLink className='nav-link' to={`${match.url}/long`}><motion.div variants={variants} whileHover='hover'>All Time</motion.div></NavLink>
                    </motion.div> */}
                </motion.div>

                <Switch>
                    <Route path={`${match.path}/:range`} component={ TracksContainer }/>
                    <Route path={`${match.path}`} component={ TracksContainer }/>      
                </Switch>
            </div>       
        );
}

export default TrackStatistics;