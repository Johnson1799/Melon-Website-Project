import { NavLink } from "react-router-dom";

/* Import redux stuff */
import { useSelector, useDispatch } from "react-redux";
import { setToggle, setIsRouting } from "../redux/slideBarToggleReducer";

const MainNavbar = () => {
    /* Access states from redux store */
    const toggleState = useSelector((state) => {
        return state.slideBarToggle.toggle;
    });
    const isRoutingState = useSelector((state) => {
        return state.slideBarToggle.isRouting;
    });

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
                    <button onClick={handleToggle}><strong className="logo">Melon</strong></button>
                </div>
            </div>
            
            <div className="aside-container">
                <aside className={`${toggleState ? "slidebar-visible" : "slidebar-invisible"}`}>
                    {/* Slide bar options  */}
                    <div className="sidebar">
                        <NavLink to="/home" className="option" onClick={handleRouteClick}><i className="fa-solid fa-house"></i><strong>Home</strong></NavLink>
                        <NavLink to="/profile" className="option" onClick={handleRouteClick}><i className="fa-solid fa-circle-user icon"></i><strong>Profile</strong></NavLink>
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