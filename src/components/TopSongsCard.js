import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { motion } from 'framer-motion';
import { store } from '../context/store';
import './TopSongs.css';

const TopSongsCard = () => {
    const context = useContext(store);
    const { top_tracks } = context.state;
    const { range } = useParams();
    const [selectedId, setSelectedId] = useState(null);

    let tracks=range? top_tracks[range] : top_tracks['short'] 

    return (
            <motion.div key={ Math.random() } initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1}}} className='top-songs card p-3'>
                { selectedId !== null ? <Song track={tracks[selectedId]} rank={selectedId+1} setSelected={setSelectedId} /> : <SongItems tracks={tracks} setSelected={setSelectedId}/> }
            </motion.div>
    )
}   

const Song = ({setSelected, track, rank}) => {
    return ( <motion.div key={track.id} intial={{opacity: 0}} animate={{ opacity: 1, transition: {duration: 2}}} onClick={ () => setSelected(null) } >
                <motion.h1 className='track-name'>{ track.name }</motion.h1>
                <motion.h2>Ranking {rank}</motion.h2>
                <motion.h2>Popularity {track.popularity} / 100</motion.h2>
             </motion.div>
            )
}

const SongItems = ({tracks, setSelected}) => {
    const items = tracks.slice(0, 5).map((track, i) => {
        return (
            <motion.li onClick={ () =>  { setSelected(i) } } key={ track.id + Math.random() } initial={{ opacity: 0}} animate={{ opacity: 1, transition: { duration: 1}}}  className='list-group-item d-flex flex-row'>
                <div className='col-auto my-auto d-flex justify-content-center' style={{padding:'0 20'}}><div className='rank-num'><strong>{i+1}</strong></div></div>
                <div className='col-auto d-flex justify-content-center' style={{ padding:'0' }}><img className='track-img' src={track.album.images[2].url} width='64px' height='64px' alt='track cover' /></div>
                <div className='col-8 my-auto'>{ track.name }</div>
            </motion.li>
        )
    })

    return <div><h1>Anthems</h1><ul className='list-group'>{items}</ul></div>
}

export default TopSongsCard