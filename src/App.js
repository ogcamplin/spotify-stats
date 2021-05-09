import { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { store } from './context/store';
import {authorise, reauthorise} from './context/actions'

/* Components */
import Home from './components/Home';
import Navbar from './components/Navbar'; 
import PrivateRoute from './PrivateRoute';
import ArtistStatistics from './components/ArtistStats';
import TrackStatistics from './components/TrackStats';
import Footer from './components/Footer';
import Privacy from './components/Privacy'
import Spinner from'./components/Spinner';

/**
 * Base container component for spotify stats app
 */
const App = () => {
  const context = useContext(store);
  const { state } = context;
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => { 
      /**
       * Tries to reauthorise user if they are not logged in.
       */
      if(!state.isAuthed) {
        reauthorise(context);
        setLoading(false);
      } else {
        setLoading(false);
      }

      /**
       * Gets access token and dispatches context action to store it.
       */
      const handleCallback = () => {
        const params = getHashParams();

        if(params.access_token) {
          authorise(context, params, setLoading);
        }
        setLoading(false);
      }
      handleCallback();
  }) 

  /**
   * Gets the access token from querystring of URL for client side use.
   */
  const getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  } 

  return isLoading? 
    <Spinner /> : 
    (
      <Switch>
        <Navbar />
        <Route exact path="/" component={ Home } />
        <PrivateRoute path="/tracks" component={ TrackStatistics }/>
        <PrivateRoute path="/artists" component={ ArtistStatistics } />
        <Route path="/privacy" component={ Privacy } />
        <Footer />
      </Switch>
      
    );
}

export default App;
