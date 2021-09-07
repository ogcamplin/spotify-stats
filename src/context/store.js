import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';

const initialState = {
  isAuthed: false,
  isLoading: false,
  spotifyApi: null,
  user: null,
  top_tracks: null,
  top_artists: null,
  recently_played: null,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
