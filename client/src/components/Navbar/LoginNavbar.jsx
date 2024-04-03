/* Import react library */
import { Link } from "react-router-dom";

const LoginNavbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">

                {/* Route to login page when clicking the 'Melon' logo in the Navbar */}
                <Link to='/' className="navbar-brand"><strong className="nav-logo">Melon</strong></Link>

                {/* Route to different page when clicking the buttons in the Navbar */}
                <ul className="nav-menu">
                    <li>
                        <Link to='/about' className="navbar-brand"><span className="nav-about">About Us</span></Link>
                    </li>

                    <li>
                        <Link to='/register' className="navbar-brand"><span className="nav-register">Sign Up</span></Link>
                    </li>

                    {/* <li>
                        <Link to='/home' className="navbar-brand"><span className="nav-about">Home</span></Link>
                    </li> */}
                </ul>
                
            </div>
        </nav>
    );
}
 
export default LoginNavbar;