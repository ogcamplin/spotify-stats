import { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { store } from './context/store';
import {authorise, reauthorise} from './context/actions'

/* Pages */
import Home from './pages/Home/Home';
import ArtistStatistics from './pages/ArtistStats/ArtistStats';
import TrackStatistics from './pages/TrackStats/TrackStats';
import Privacy from './pages/Privacy'

/* Components */
import PrivateRoute from './PrivateRoute';
import Navbar from './components/NavBar/Navbar'; 
import Spinner from'./components/Spinner/Spinner';
import Footer from './components/Footer/Footer';

/**
 * Base container component for spotify stats app
 */
const App = (props) => {
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
          props.history.push('/')
        }
        setLoading(false);
        
      }
      handleCallback();
  }, [context, state]) 

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
