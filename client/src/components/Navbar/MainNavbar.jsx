/* Import react library */
import { NavLink } from "react-router-dom";

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { setToggle, setIsRouting } from "../../redux/Reducers/slideBarToggleReducer";

const MainNavbar = () => {
    /* Access states from redux store */
    const toggleState = useSelector((state) => {
        return state.slideBarToggle.toggle;
    });

    const user = useSelector((state) => {
        return state.user.user;
    });

    /* Find the user id from the redux states */
    const userId = user?._id;
    const profileId = `65fcf2c2310469dbac43c6c5`;

    /* Access action from redux store */
    const dispatch = useDispatch();

    /* Handlers */
    const handleToggle = (e) => {
        dispatch(setToggle());
        dispatch(setIsRouting(false));
    };

    const handleRouteClick = (e) => {
        dispatch(setIsRouting(true));
    };
    

    return (
        <div className="main-nav-containter">
            <div className="toggle-container">
                <div className="logo-container">
                    
                    {/* Toggle the Navbar when clicking the 'Melon' logo */}
                    <button onClick={handleToggle}><strong className="logo">Melon</strong></button>
                </div>
            </div>
            
            <div className="aside-container">
                <aside className={`${toggleState ? "slidebar-visible" : "slidebar-invisible"}`}>

                    {/* Route to different page when clicking the buttons in the Navbar */}
                    <div className="sidebar">
                        <NavLink to="/home" className="option" onClick={handleRouteClick}><i className="fa-solid fa-house"></i><strong>Home</strong></NavLink>
                        <NavLink to={`/profile/${userId}`} className="option" onClick={handleRouteClick}><i className="fa-solid fa-circle-user icon"></i><strong>Profile</strong></NavLink>
                        <NavLink to="/message" className="option" onClick={handleRouteClick}><i className="fa-solid fa-message icon"></i><strong>Message</strong></NavLink>
                        <NavLink to="/setting" className="option" onClick={handleRouteClick}><i className="fa-solid fa-gear icon"></i><strong>Setting</strong></NavLink>
                        <NavLink to="/" className="option"><i className="fa-solid fa-right-from-bracket icon"></i><strong>Logout</strong></NavLink>
                    </div>
                </aside>
            </div>
        </div>
    );
}
 
export default MainNavbar;