/* Components */
import { useContext, useEffect, useState } from 'react';
import { store } from '../../context/store';
import { useParams } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* Styles */
import 'bootstrap/dist/css/bootstrap.css';
import '../StatItem.css';

const TracksContainer = () => {
  const context = useContext(store);
  const { range } = useParams();
  const { top_tracks } = context.state;

  const tracks = range ? top_tracks[range] : top_tracks['short'];
  const [isExpanded, setExpanded] = useState(null);

  const expand = (track) => {
    setExpanded(track);
  };

  const collapse = () => {
    setExpanded(null);
  };

  useEffect(() => {
    setExpanded(null);
  }, [range]);

  return (
    <motion.div key={Math.random()} className='row'>
      {isExpanded ? (
        <TrackExpanded track={isExpanded} onCollapse={collapse} />
      ) : (
        tracks.map((track, i) => (
          <TrackCollapsed
            track={track}
            rank={i + 1}
            onExpand={expand}
            range={range}
          />
        ))
      )}
    </motion.div>
  );
};

const TrackCollapsed = ({ track, rank, onExpand, range }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1 },
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
  };

  return (
    <div
      key={rank}
      className='col-lg-3 col-xl-3 col-md-6 col-sm-12 d-flex justify-content-center mt-5'
    >
      <motion.div
        variants={variants}
        onClick={() => onExpand(track)}
        ref={ref}
        initial='hidden'
        animate={controls}
      >
        <motion.div className='artist-rank'>
          <h1>{rank}</h1>
        </motion.div>
        <motion.div className='artist-card card'>
          <motion.img
            className='card-img-top artist-card-img'
            whileHover={{
              opacity: 0.6,
              transition: {
                duration: 0.3,
                delay: 0,
              },
            }}
            src={track.album.images[1].url}
            alt='artist image'
          />
          <motion.h5 className='text-center card-title artist-title'>
            {track.name}
          </motion.h5>
        </motion.div>
      </motion.div>
    </div>
  );
};

const TrackExpanded = ({ track, onCollapse }) => {
  return (
    <motion.div
      className='container artist-expanded'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => onCollapse()}
    >
      <h1>{track.name}</h1>
    </motion.div>
  );
};

export default TracksContainer;
