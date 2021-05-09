import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { motion } from 'framer-motion';
import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { store } from '../context/store';

const getTimeData = (recently_played) => {
    const tracks = recently_played;

    let map = tracks.map(t => {
        return new Date(t.played_at)
    })

    let today = new Date()
    map = map.filter(d => {
        return today.getFullYear() === d.getFullYear() 
            && today.getMonth() === d.getMonth() 
            && today.getDate() === d.getDate()
    })

    let dates = Array.from(Array(24));

    let dateMap = map.reduce((total, it) => {
        let hr = it.getHours();
        total[hr] = total[hr] + 1 || 1;
        return total;
    }, [])

    return Object.keys(dates).reduce((arr, key) => {
        arr.push({ name: `${key}:00`, songs: dateMap[key]? dateMap[key] : 0 })
        return arr;
    }, [])

}

const TimeCard = () => {
    const context = useContext(store);
    const { recently_played } = context.state;

    return (
        <motion.div key={ Math.random() } initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1}}} className='card p-3' style={{height: '100%'}} >
                <h1>Time</h1> 
                <ResponsiveContainer width='100%' height={300}>
                    
                    <LineChart data={getTimeData(recently_played)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type='monotone' dataKey='songs' stroke='#82ca9d' strokeWidth={3}/>
                    </LineChart>
                </ResponsiveContainer>
        </motion.div>
    )
}

export default TimeCard;