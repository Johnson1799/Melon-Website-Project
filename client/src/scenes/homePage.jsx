/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import components */
import MainNavbar from "../components/Navbar/MainNavbar";
import LargePost from "../components/Post/LargePost";

const HomePage = () => {
    const user = useSelector((state) => {
       return state.user.user;
    });
    const toggleLargePost = useSelector((state) => {
        return state.post.toggleLargePost;
    })

    const RouteProfile = (e) =>{

    }

    const receivePostInfo = (data) => {

    }
    
    return (
        <div className="home-page-container">
            <MainNavbar />
            HomePage    
            {/* {toggleLargePost && <LargePost sendPostInfo={receivePostInfo}/>} */}
        </div>
    )
}

export default HomePage;