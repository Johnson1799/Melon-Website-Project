/* Import redux library */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/* Import components */
import MainNavbar from "../components/Navbar/MainNavbar";
import FriendRequest from '../components/Notification/FriendRequest';


const InboxPage = () => {

    const [countInboxMessage, setCountInboxMessage] = useState(0);

    const countFriendRequests = useSelector((state) => {
        return state.notification.countFriendRequests;
    });

    useEffect(()=>{

    })

    return (
        <div className="inbox-page-container">
            {/* Display NavBar */}
            <MainNavbar />

            <div className="inbox-grid-container">
                <span className="main-title">Inbox</span>
                {/* <strong className="icon">{countFriendRequests}</strong> */}

                {/* Display Notifivation */}
                <div className="notification-container">
                    <FriendRequest />
                </div>
            </div>  
        </div>
    )
}

export default InboxPage;