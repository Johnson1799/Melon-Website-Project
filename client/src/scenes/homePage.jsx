/* Import react-redux */
import { useSelector, useDispatch } from "react-redux";

import MainNavbar from "components/MainNavbar";

const HomePage = () => {
    const user = useSelector((state) => {
       return state.user.user;
    });
    
    return (
        <div className="profile-container">
            <MainNavbar />
            HomePage    
            <br /><p>{user._id}</p>
        </div>
    )
}

export default HomePage;