import Spotify from 'spotify-web-api-js';

const authorise = (context, params, setLoading) => {
  const { dispatch, state } = context;
  const { access_token, expires_in } = params;

  if (!state.isAuthed) {
    const authTime = new Date();
    localStorage.setItem(
      'access_token',
      JSON.stringify({
        access_token: access_token,
        expiry: authTime.getTime() + (expires_in - 200) * 1000,
      })
    );
    const spotifyApi = new Spotify();
    spotifyApi.setAccessToken(access_token);
    dispatch({ type: 'SPOTIFY_AUTHORIZE', data: spotifyApi });
    setLoading(false);
  }
};

const reauthorise = (context) => {
  const { dispatch } = context;

  const token = localStorage.getItem('access_token');

  if (token) {
    const parsed_token = JSON.parse(token);
    const reauthTime = new Date();

    if (reauthTime.getTime() < parsed_token.expiry) {
      let spotifyApi = new Spotify();
      spotifyApi.setAccessToken(parsed_token.access_token);
      dispatch({ type: 'SPOTIFY_REAUTHORIZE', data: spotifyApi });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }
};

const fetchUser = (context, setLoading) => {
  const { dispatch, state } = context;
  const { spotifyApi } = state;

  if (!state.user && state.isAuthed) {
    spotifyApi
      .getMe()
      .then((res) => {
        dispatch({ type: 'SPOTIFY_USER', data: res });
        setLoading(false);
      })
      .catch((e) => {
        if (e.status === 401) {
          dispatch({ type: 'SPOTIFY_REAUTHORIZE' });
        }
      });
  } else {
    setLoading(false);
  }
};

const fetchTracks = (context, setLoading) => {
  const { dispatch, state } = context;
  const { spotifyApi } = state;

  if (!state.top_tracks) {
    Promise.all([
      spotifyApi.getMyTopTracks({ time_range: 'short_term', limit: 50 }),
      spotifyApi.getMyTopTracks({ time_range: 'medium_term', limit: 50 }),
      spotifyApi.getMyTopTracks({ time_range: 'long_term', limit: 50 }),
    ])
      .then((res) => {
        dispatch({
          type: 'SPOTIFY_TRACK',
          data: Object.create({
            short: res[0].items,
            medium: res[1].items,
            long: res[2].items,
          }),
        });
        setLoading(false);
      })
      .catch((e) => {
        if (e.status === 401) {
          dispatch({ type: 'SPOTIFY_REAUTHORIZE' });
        }
      });
  } else {
    setLoading(false);
  }
};

const fetchArtists = (context, setLoading) => {
  const { dispatch, state } = context;
  const { spotifyApi } = state;

  if (!state.top_artists) {
    Promise.all([
      spotifyApi.getMyTopArtists({ time_range: 'short_term', limit: 50 }),
      spotifyApi.getMyTopArtists({ time_range: 'medium_term', limit: 50 }),
      spotifyApi.getMyTopArtists({ time_range: 'long_term', limit: 50 }),
    ])
      .then((data) => {
        dispatch({
          type: 'SPOTIFY_ARTIST',
          data: Object.create({
            short: data[0].items,
            medium: data[1].items,
            long: data[2].items,
          }),
        });
        setLoading(false);
      })
      .catch((e) => {
        if (e.status === 401) {
          dispatch({ type: 'SPOTIFY_REAUTHORIZE' });
        }
      });
  } else {
    setLoading(false);
  }
};

const fetchRecent = (context) => {
  const { dispatch, state } = context;
  const { spotifyApi } = state;

  if (!state.recently_played) {
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 }).then((res) => {
      dispatch({ type: 'SPOTIFY_RECENT', data: res.items });
    });
  }
};

export {
  fetchTracks,
  fetchRecent,
  fetchUser,
  fetchArtists,
  authorise,
  reauthorise,
};
