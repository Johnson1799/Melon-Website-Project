/* Import components */
import LoginNavbar from "../components/Navbar/LoginNavbar";

/* Import assets */
import teamateIcon1 from '../assets/human-icon.png';

const AboutPage = () => {
    return ( 
        <div>
            {/* Display Navbar */}
            <LoginNavbar />

            {/* Display the heading 'About Us' */}
            <div className="about-container"> 
                <div className='aboutus-text-container'>
                    <h1>About Us</h1>
                </div>

                {/* Display the grid content */}
                <div className="aboutus-grid-container">
                    {/* Column 1 */}
                    <div className="c1">
                        <div className="teamate1">
                            <img className="teamate1-gird-icon" src={teamateIcon1} alt="Teamate icon 1" />
                            <br />
                            <div className='teamate-name'>Tse Chung Chin</div>
                            <div className='teamate-content'>
                                <p>UI Designer</p>
                                <button><strong>Bio</strong></button>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="c2">
                        <div className="teamate2">
                            <img className="teamate2-gird-icon" src={teamateIcon1} alt="Teamate icon 2" />
                            <br />
                            <div className='teamate-name'>Tse Chung Chin</div>
                            <div className='teamate-content'>
                                <p>UI Designer</p>
                                <button><strong>Bio</strong></button>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="c3">
                        <div className="teamate3">
                            <img className="teamate3-gird-icon" src={teamateIcon1} alt="Teamate icon 3" />
                            <br />
                            <div className='teamate-name'>Tse Chung Chin</div>
                            <div className='teamate-content'>
                                <p>UI Designer</p>
                                <button><strong>Bio</strong></button>
                            </div>
                        </div>
                    </div>

                    {/* Column 4 */}
                    <div className="c4">
                        <div className="teamate4">
                            <img className="teamate4-gird-icon" src={teamateIcon1} alt="Teamate icon 4" />
                            <br />
                            <div className='teamate-name'>Tse Chung Chin</div>
                            <div className='teamate-content'>
                                <p>UI Designer</p>
                                <button><strong>Bio</strong></button>
                            </div>
                        </div>
                    </div>

                    {/* Column 5 */}
                    <div className="c5">
                        <div className="teamate5">
                            <img className="teamate5-gird-icon" src={teamateIcon1} alt="Teamate icon 5" />
                            <br />
                            <div className='teamate-name'>Tse Chung Chin</div>
                            <div className='teamate-content'>
                                <p>UI Designer</p>
                                <button><strong>Bio</strong></button>
                            </div>
                        </div>
                    </div>

                    {/* Column 6 */}
                    <div className="c6">
                        <div className="teamate6">
                            <img className="teamate6-gird-icon" src={teamateIcon1} alt="Teamate icon 6" />
                            <br />
                            <div className='teamate-name'>Tse Chung Chin</div>
                            <div className='teamate-content'>
                                <p>UI Designer</p>
                                <button><strong>Bio</strong></button>
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        </div>
        
    );
}
 
export default AboutPage;