import React, { useEffect, useContext, useState } from 'react';
import { store } from '../context/store';
import { NavLink, useRouteMatch, Route, Switch } from 'react-router-dom';
import { fetchTracks, fetchRecent } from '../context/actions.js'
import './StatsPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import TracksContainer from './TracksContainer';
import Spinner from '../components/Spinner';

const TrackStatistics = () => {
    const context = useContext(store);
    const match = useRouteMatch();
    const [ isLoading, setLoading ] = useState(true);
    const [ timeFilter, setTimeFilter ] = useState('1 Month');

    useEffect(() => {
        fetchTracks(context, setLoading);
        fetchRecent(context, setLoading);
    }, [setLoading, context])

    return isLoading ?
        <Spinner />
        : 
        (   
            <div className='container track-stats'>
                <div className='d-flex flex-row align-items-center my-5'>
                    <h1 className='display-6 pg-title'>TRACKS</h1>

                    <div className='dropright ml-4'>
                        <button class='time-dropdown btn btn-lg btn-primary dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            { timeFilter }
                        </button>
                        <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                            <NavLink className='dropdown-item' to={`${match.url}/short`} onClick={() => setTimeFilter('1 Month')}>1 Month</NavLink>
                            <NavLink className='dropdown-item' to={`${match.url}/medium`}  onClick={() => setTimeFilter('6 Months')}>6 Months</NavLink>
                            <NavLink className='dropdown-item' to={`${match.url}/long`}  onClick={() => setTimeFilter('All Time')}>All Time</NavLink>
                        </div>
                    </div>
                </div>

                <Switch>
                    <Route path={`${match.path}/:range`} component={ TracksContainer }/>
                    <Route path={`${match.path}`} component={ TracksContainer }/>      
                </Switch>
            </div>       
        );
}

export default TrackStatistics;