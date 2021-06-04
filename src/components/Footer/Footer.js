import'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.css';

function Footer() {
    return (
        <div className='navbar fixed-bottom footer mt-5'>
            <div className='nav-item'>© Oscar Camplin</div>
            <NavLink className="nav-link" to="/privacy">Privacy Policy</NavLink>
        </div>
    )
}

export default Footer;