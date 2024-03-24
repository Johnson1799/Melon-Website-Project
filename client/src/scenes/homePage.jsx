/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import components */
import MainNavbar from "../components/Navbar/MainNavbar";

const HomePage = () => {
    const user = useSelector((state) => {
       return state.user.user;
    });

    const RouteProfile = (e) =>{

    }
    
    return (
        <div className="home-page-container">
            <MainNavbar />
            HomePage    
            <br /><p>{user?._id}</p>
        </div>
    )
}

export default HomePage;