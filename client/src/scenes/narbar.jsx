import { useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand"><strong className="nav-logo">Melon</strong></Link>

                <ul className="nav-menu">
                    <li>
                        <Link to='/about' className="navbar-brand"><span className="nav-about">About Us</span></Link>
                    </li>

                    <li>
                        <Link to='/about' className="navbar-brand"><span className="nav-about">About Us</span></Link>
                    </li>

                    <li>
                        <Link to='/about' className="navbar-brand"><span className="nav-about">About Us</span></Link>
                    </li>
                </ul>
                

                

            </div>

        </nav>
    );
}
 
export default Navbar;