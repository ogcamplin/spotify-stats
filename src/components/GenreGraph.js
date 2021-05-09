import React, { Component } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { store } from '../context/store';

class GenreGraph extends Component {
    static contextType = store;

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        let artists = this.context.state.top_artists[this.props.key];
        let genres = artists.flatMap(a => a.genres);
        
        const map = genres.reduce((total, it) => {
            total[it] = total[it] + 1 || 1;
            return total;
        }, {});

        const arr = Object.keys(map).reduce((arr,key) => {
            arr.push({ key: key, value: map[key]});

            return arr;
        }, [])

        const topGenres = arr.sort((a, b) => b.value - a.value).slice(0, 8);

        this.setState({ data: this.convertData(topGenres) });
        console.log(topGenres);
    }

    convertData = (data) => {
        let total = data.reduce((tot, it) => {
            tot = tot + it.value;
            return tot;
        }, 0)

        return data.map(x => { 
            return {
                genre: x.key,
                val: x.value,
                total: total 
            }
        })
    }
    
    render() {

        return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.state.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="genre" />
                <PolarRadiusAxis />
                <Radar name="TopGenres" dataKey="val" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart> 
        )
    }




}

export default GenreGraph;