/**
 * Manipulates context store state based on action and associated data
 * 
 * @param {*} state current context state
 * @param {*} action to perform
 */
const reducer = (state, action) => {
    switch(action.type) {
        case 'SPOTIFY_AUTHORIZE':
            return { 
              ...state,
              isAuthed: true,
              spotifyApi: action.data
            }
        case 'SPOTIFY_REAUTHORIZE':
              return { 
                ...state,
                isAuthed: true,
                spotifyApi: action.data
              }
        case 'LOGOUT':
            localStorage.removeItem('access_token');
            return { 
              isAuthed: false,
              spotifyApi: null,
              user: null,
              top_tracks: null,
              top_artists: null
            }
        case 'SPOTIFY_USER':
            return {
              ...state,
              user: action.data,
              isLoading: false 
            }
        case 'SPOTIFY_TRACK': 
            return {
              ...state,
              top_tracks: action.data,
              isLoading: false
            };
        case 'SPOTIFY_ARTIST':
            return {
              ...state,
              top_artists: action.data,
              isLoading: false
            };
        case 'SPOTIFY_RECENT':
            return {
              ...state,
              recently_played: action.data,
              isLoading: false
            };
        case 'LOADING': 
            return {
              ...state,
              isLoading: true
            }
        default:
            return state;
    }
}

export { reducer }

