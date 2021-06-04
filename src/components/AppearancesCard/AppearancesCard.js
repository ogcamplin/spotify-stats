import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import { XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { store } from '../../context/store';

const getAppearances = (tracks) => {
    let artists = tracks.flatMap(t => t.artists);

    artists = artists.map(a => a.name);
    
    const map = artists.reduce((total, it) => {
        total[it] = total[it] + 1 || 1;
        return total;
    }, {});

    const arr = Object.keys(map).reduce((arr,key) => {
        arr.push({ artist: key, appearances: map[key]});

        return arr;
    }, [])

    return arr.sort((a, b) => b.value - a.value).slice(0, 5);
}

const AppearancesCard = () => {
    const context = useContext(store);
    const { top_tracks } = context.state;
    const { range } = useParams();

    let tracks=range? top_tracks[range] : top_tracks['short'] ;

    return (
        <motion.div key={ Math.random() } initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1}}} className='card p-3' style={{height: '100%'}} >
            <h1>Top Appearances</h1> 
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart className='mx-auto' layout='vertical' data={getAppearances(tracks)} >
                    <YAxis width={100} axisLine={false} type='category' dataKey='artist' />
                    <XAxis axisLine={false} type='number' tick={false} dataKey='appearances' />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='appearances' fill='#000000'/>
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    )
}

export default AppearancesCard;