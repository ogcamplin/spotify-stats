import 'bootstrap/dist/css/bootstrap.css';
import './Home.css'
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { store } from '../context/store';
import { fetchUser } from '../context/actions'

import Spinner from '../components/Spinner'

const StartButton = () => {
    const variants = {
        hover: {
            scale: 1.1,
            originX: 0.01
        }
    }

    return (
        <motion.div variants={ variants }  className='text-center mt-4' whileHover='hover'>
            <motion.a className='start-button' href='http://192.168.1.90:5000/login'>
                Get started
                <motion.img className='chevron' src={ process.env.PUBLIC_URL + '/arrow_right.png'} height='30' width='30' alt='chevron' />
            </motion.a>
        </motion.div>
    )
}

const Home = () => {
    const context = useContext(store);
    const { user, isAuthed } = context.state;
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser(context, setLoading)
    }, [isAuthed, context]);

    return ( 
        <div className='home-page container-lg d-flex flex-column'>
            {   isLoading? 
                    <Spinner /> :
                    isAuthed ? 
                    ( 
                        <motion.div className='my-5 row'>
                            <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} transition={{duration: 1}} className='col-6'>
                                <motion.h1 className='heading-1 text-lg-start'>{ user.display_name }</motion.h1>
                                <motion.div className='d-flex flex-row heading-container'> 
                                    <motion.img className='globe-image' src={process.env.PUBLIC_URL + '/globe.png'} height='40' width='40'/>
                                    <motion.h2 className='heading-2 my-auto'>{ user.country }</motion.h2>
                                </motion.div>
                                <motion.h3 className='heading-3 mt-3'>{ user.followers.total } followers</motion.h3>

                                <div className='d-flex justify-content-center my-5'>
                                    <div className='profile-image' style={{ background: `url(${user.images[0].url}) 50% 50%` }}></div>
                                </div>

                            </motion.div>
                        </motion.div> 
                    ) : (
                        <div className='my-5'>
                            <h1 className='heading-1 text-lg-start'>Welcome.</h1>
                            <h2 className='heading-2'>Unlock the power, <br /> see your spotify listening stats</h2>
                            <StartButton />
                        </div>
                    )
            }
        </div>
    )
}

export default Home;