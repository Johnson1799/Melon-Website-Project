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

            <aside className={`${toggleState ? "slidebar-visible" : "slidebar-invisible"} ${isRoutingState ? "no-roll-animation" : "roll-animation"}`}>
                {/* Slide bar options  */}
                <div className="sidebar">
                    <NavLink to="/home" className="option" activeClassName="active" onClick={handleRouteClick}><i class="fa-solid fa-house"></i><strong>Home</strong></NavLink>
                    <NavLink to="/profile" className="option" activeClassName="active" onClick={handleRouteClick}><i className="fa-solid fa-circle-user icon"></i><strong>Profile</strong></NavLink>
                    <NavLink to="/message" className="option" activeClassName="active" onClick={handleRouteClick}><i className="fa-solid fa-message icon"></i><strong>Message</strong></NavLink>
                    <NavLink to="/setting" className="option" activeClassName="active" onClick={handleRouteClick}><i className="fa-solid fa-gear icon"></i><strong>Setting</strong></NavLink>
                    <NavLink to="/" className="option" activeClassName="active"><i className="fa-solid fa-right-from-bracket icon"></i><strong>Logout</strong></NavLink>
                </div>
            </aside>
        </div>
    );
}
 
export default MainNavbar;