/* Import redux library */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

/* Import redux library */
import { useSelector, useDispatch } from "react-redux";

/* Import redux reducers */
import { setProfileUser } from "../redux/Reducers/postReducer";

/* Import components */
import MainNavbar from "../components/Navbar/MainNavbar";

const HomePage = () => {
    const user = useSelector((state) => {
       return state.user.user;
    });
    const token = useSelector((state) => {
        return state.user.token;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userPosts, setUserPosts] = useState(null);
    const [friendsPosts, setFriendsPosts] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});
    const [noOfLikes, setNoOfLikes] = useState({});
    const [noOfComments, setNoOfComments] = useState({});
    const [toggleLargePost, setToggleLargePost] = useState(false);
    const [largePostInfo, setLargePostInfo] = useState(null);
    const [toggleComments, setToggleComments] = useState(false);
    const [comment, setComment] = useState('');
    const [activeCommentIndex, setActiveCommentIndex] = useState(null);
    const [toggleReplyTextArea, setToggleReplyTextArea] = useState(false);
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const getAllFriendPosts = async() => {
        setIsLoading(true);
        const url = `http://localhost:3001/posts/get/friends/${user?._id}`;
        await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Get request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) =>{
            setUserPosts(data.userPosts);
            setFriendsPosts(data.friendsPosts);
            console.log(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });

    }

    const fetchLargePostData = async (postId) => {
        const url = `http://localhost:3001/posts/get/${postId}`;
        
        await fetch(url, 
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res)=>{
            if (!res.ok) {
                throw new Error(`Error fetching large post data`);
            }
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            setLargePostInfo(data);
        })
        .catch((err)=>{
            console.log(err);
        })

    };

    const Initialize = () =>{

        const initialLikedPosts = {};
        const initialNoOfLikes = {};
        const initialNoOfComments = {};
        friendsPosts?.forEach(friendPosts => {
            friendPosts.forEach(post => {
                /* Initialize the no.of like of the post */
                initialNoOfLikes[post._id] = post.likes.length;

                /* Initialize the no.of like of the post */
                initialNoOfComments[post._id] = post.comments.length;
                
                /* Initialize the like status(e.g liked or unliked) of the post */
                initialLikedPosts[post._id] = post.likes.includes(user?._id);

            });
        });
        setNoOfLikes(initialNoOfLikes);
        setNoOfComments(initialNoOfComments);
        setLikedPosts(initialLikedPosts);

    }

    useEffect(()=>{
        if (!userPosts || !friendsPosts){
            getAllFriendPosts();
        }

        Initialize();

    },[userPosts, friendsPosts, user?._id])


    const routeToProfilePage = async(userId) => {
        const url = `http://localhost:3001/users/user/${userId}`;
        await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Fail to send friend request ');
            }
            return res.json();
        })
        .then((data) => {
            if (data.user._id !== user?._id){
                dispatch(setProfileUser(data.user));
                navigate(`/profile/other/${data.user?._id}`);
            }
        })
        .catch((err) => {
            console.error('Error updating user data:', err);
        });
    }

    const toggleLike = async(info,e) => {
        const postId = info.postId;
        e.stopPropagation();

        const url = `http://localhost:3001/posts/like/${info.userId}`;
        const data = {
            userId: user?._id,
            postId: postId,
            isHomePage: true,
        };

        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Get request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) =>{
            /* Toggle the like button */
            setLikedPosts(prevLikedPosts => {
                const newLikedPosts = { ...prevLikedPosts };
                newLikedPosts[postId] = !data.isLiked;
                return newLikedPosts;
            });

            /* Add or deduct the no.of like of the post */
            setNoOfLikes((prevNoOfLikes) => {
                const newNoOfLikes = { ...prevNoOfLikes };
                newNoOfLikes[postId] = !data.isLiked ? prevNoOfLikes[postId] + 1 : prevNoOfLikes[postId] - 1;
                return newNoOfLikes;
            });

        })
        .catch((err) => {
            console.log(err);
        });
        
    }

    const displayLargePost = async(friendPost) => {
        await fetchLargePostData(friendPost._id);
        setToggleLargePost(true);

    }

    const displayLargePostWithComments = async(friendPost) => {

        await fetchLargePostData(friendPost._id);

        /* Toggle the large post */
        setToggleLargePost(true);
        setToggleComments(true);

        /* Reset replies related states */
        setActiveCommentIndex(null);
        setToggleReplyTextArea(false);
        setReply('');
        
    }

    const closeLargePost = () => {
        setToggleLargePost(false);
        setLargePostInfo(null);
        setToggleComments(false);
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const submitComment = async(e) => {
        e.preventDefault();

        const url = `http://localhost:3001/posts/comment/${user?._id}/${largePostInfo._id}`;
        const data = {
            comment: comment,
        }
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Post request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) => {
            const newLargePostInfo = {...largePostInfo}
            newLargePostInfo.comments = data;
            setLargePostInfo(newLargePostInfo);

            /* Update the no.of comments of the post */
            const postId = largePostInfo._id;
            setNoOfComments((prevNoOfComments) => {
                const newNoOfComments = { ...prevNoOfComments };
                newNoOfComments[postId] = prevNoOfComments[postId] + 1;
                return newNoOfComments;
            });

        })
        .catch((err) => {
            console.log(err);
        });

        /* Clear the text in textfield */
        setComment("");

    }

    const handleReply = (index) => {
        /* Toggle reply area */
        if (activeCommentIndex === index) {
            setActiveCommentIndex(null); 
        } else {
            setActiveCommentIndex(index);
        }
        console.log(largePostInfo.comments[index].replies.length);
        
    }

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    }

    const submitReply = async(e,commentIndex) => {
        e.preventDefault();

        const url = `http://localhost:3001/posts/reply/${user?._id}/${largePostInfo._id}`;
        const data = {
            commentIndex: commentIndex,
            reply: reply,
        }
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        .then((res)=>{
            if (!res.ok){
                throw new Error(`Post request in (${url}) failed`);
            }
            return res.json();
        })
        .then((data) => {
            const newLargePostInfo = {...largePostInfo}
            newLargePostInfo.comments = data;
            setLargePostInfo(newLargePostInfo);
        })
        .catch((err) => {
            console.log(err);
        });

        /* Display the reply textarea */
        // setToggleReplyTextArea(true);

        /* Clear the text in textfield */
        setReply("");
    }
    
    return (
        <>
            {/* Loading spinner */}
            {isLoading && 
                (<div className="spinning-overlay">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)
            }


            {/* HomePage container */}
            <div className="home-page-container">
                <MainNavbar />

                {/* HomePage posts */}
                <div className="posts-render-container">
                    {friendsPosts && friendsPosts.map((friendsPosts, index1) => (
                        friendsPosts.map((friendPost, index2) => {
                            const postIsLiked = likedPosts[friendPost._id] || false;
                            const noOfLikesPost = noOfLikes[friendPost._id];
                            const noOfCommentsPost = noOfComments[friendPost._id];

                            return (
                            <div className="home-page-post-container" key={index1 + '-' + index2} onClick={() => displayLargePost(friendPost)}>
                                <div className="user-info" onClick={()=> routeToProfilePage(friendPost.userId)}>
                                    <img src={`${friendPost.userAvatarURL}`} alt="" className="user-avatar"/>
                                    <span className="username">{friendPost.userName}</span>
                                </div>
                                
                                <div className="post-container large home" key={index1 + '-' + index2}>
                                    <img src={`${friendPost.postImgURL}`} alt="" className="post-image large"/>
                                    <div className="post-info">
                                        <span className="post-title large">{friendPost.title}</span>
                                        <span className="post-date">{friendPost.createdAt.toString().slice(0, 10)}</span>
                                    </div>
                                    <p className="post-content large">{friendPost.description}</p>

                                    <div className="post-like-comment large">
                                        <button className="post-like" onClick={(e) => toggleLike({userId: friendPost.userId, postId: friendPost._id},e)}><i className={`${(postIsLiked) ? 'fa-solid':'fa-regular'} fa-heart like-icon ${(postIsLiked) ? 'liked':'unliked'}`} ></i><p className="no-of-likes">{noOfLikesPost}</p></button>
                                        <button className="post-comment" onClick={() => displayLargePostWithComments(friendPost)}><i className="fa-regular fa-comment comment-icon"></i><p className="no-of-comment">{noOfCommentsPost}</p></button>
                                    </div>
                                </div>
                            </div>
                            )}
                        )  
                    ))}
                </div>



                {/* Enlarged Post */}
                {toggleLargePost && 
                (
                    <div className="large-post-overlay">
                        <div className="large-post-grid" style={{left: toggleComments ? '15%': '35%' }}>
                            <div className="post-container large" >
                                {/* Close large post button */}
                                <button className="large-post-close-button" onClick={closeLargePost}><i className="fa-solid fa-xmark"></i></button>   
                                
                                {/* Large post content */}
                                <img src={largePostInfo.postImgURL} alt="This is post Img" className="post-image large"/>
                                <div className="post-info">
                                    <span className="post-title large">{largePostInfo.title}</span>
                                    <span className="post-date">{largePostInfo.createdAt.toString().slice(0, 10)}</span>
                                </div>
                                <p className="post-content large">{largePostInfo.description}</p>

                                <div className="post-like-comment large">
                                    <button className="post-like" onClick={ (e) => toggleLike({userId: largePostInfo.userId, postId: largePostInfo._id},e) }><i className={`${likedPosts[largePostInfo._id] ? 'fa-solid':'fa-regular'} fa-heart like-icon ${likedPosts[largePostInfo._id] ? 'liked':'unliked'}`} ></i><p className="no-of-likes">{noOfLikes[largePostInfo._id]}</p></button>
                                    <button className="post-comment" onClick={() => setToggleComments(!toggleComments)}><i className="fa-regular fa-comment comment-icon"></i><p className="no-of-comment">{largePostInfo.comments.length}</p></button>
                                </div>
                            </div>
                        </div>
                    </div>

                )}



                {/* Comment list */}
                {toggleComments && 
                    (<div className="comment-grid" style={{zIndex: '3', top: '5.5%'}}>
                            <div className="comments-container">
                                <form>
                                    <div className="comment-textarea">
                                        <img src={`${user?.userAvatarURL}`} alt="" />

                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '120px', width: '370px'}} value={comment} onChange={handleCommentChange}></textarea>
                                            <label htmlFor="floatingTextarea2">Comments</label>
                                            <button className="submit-button" onClick={submitComment}>Submit</button>
                                        </div>
                                    </div>
                                </form>
                                
                                <div className="comments">
                                    {largePostInfo ? 
                                        (largePostInfo.comments.map((comment,index) => (
                                            <div className="comment-container-with-reply" key={index} >
                                                <div className="comment-container">
                                                    <img className='user-avatar' src={`${comment.userAvatarURL}`} alt="" />
                                                    <div className="comment-contents">
                                                        <span className="username">{comment.userName}</span>
                                                        <p className="comment-text">{comment.comment}</p>
                                                    </div>
                                                    <button className="reply-button" onClick={() => handleReply(index)}><i className="fa-solid fa-caret-down"></i></button>
                                                
                                                </div>


                                                {/* Reply comment  */}
                                                {activeCommentIndex === index && (
                                                    <div className="replies-container" style={{height: largePostInfo.comments[index].replies.length > 0 ? '210px': '100px'}}>
                                                        <form>
                                                            <div className="comment-textarea smaller" >
                                                                <img src={`${user?.userAvatarURL}`} alt="" className="smaller"/>

                                                                <div className="form-floating">
                                                                    <textarea className="form-control" placeholder="Leave a reply here" id="floatingTextarea2" style={{height: '60px', width: '345px'}} value={reply} onChange={handleReplyChange}></textarea>
                                                                    <label htmlFor="floatingTextarea2 smaller">Reply</label>
                                                                    <button className="submit-button smaller" onClick={(e)=>submitReply(e,index)}>Submit</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    

                                                        <div className="replies">
                                                            {largePostInfo ? 
                                                                (largePostInfo.comments[index].replies.map((reply,index) => (
                                                                    <div className="reply-container-with-reply smaller" key={index}>
                                                                        <div className="comment-container smaller">
                                                                            <img className='user-avatar smaller' src={`${reply.userAvatarURL}`} alt="" />
                                                                            <div className="comment-contents smaller">
                                                                                <span className="username smaller">{reply.userName}</span>
                                                                                <p className="comment-text smaller">{reply.reply}</p>
                                                                            </div> 
                                                                        </div>
                                                                    </div>
                                                                )))
                                                            : null}
                                                        </div>
                                                    </div>)
                                                }
                                            </div>
                                        )))
                                    : null}
                                </div>
                            </div>
                    </div>)
                }



                {/* <div className="home-page-search-bar-container">
                    <SearchBar />
                </div>

                <div className="friend-recommandation-container">
                    <span className="title">Friend Recommandation</span>
                </div>

                <div className="home-page-notification-container">
                    <span className="title">Notification</span>
                </div> */}
                
            </div>
        </>
    )
}

export default HomePage;