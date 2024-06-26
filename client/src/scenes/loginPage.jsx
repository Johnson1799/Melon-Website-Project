/* Import react library */
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

/* Import redux library */
import { useDispatch, useSelector} from "react-redux";

/* Import redux reducers */
import { resetUserState ,setLogin } from "../redux/Reducers/userReducer.js";
import { resetPostState } from "../redux/Reducers/postReducer.js";
import { resetSlideBarState } from "../redux/Reducers/slideBarToggleReducer.js";
import { resetModalState } from "../redux/Reducers/modalReducer.js";
import { setAdmin, resetAdminState } from "../redux/Reducers/adminReducer.js";
import { setToggle } from "../redux/Reducers/slideBarToggleReducer.js";

/* Import components */
import LoginNavbar from "../components/Navbar/LoginNavbar.jsx";

/* Import assets */
import loginPic from '../assets/loginPic.png';         // 490*367 px

const adminAccount = {email: 'admin@admin', password:'admin123'};

const LoginPage = () => {
    /* Reference to HTML tag */
    const emailTextfieldRef = useRef(null);
    const passwordTextfieldRef = useRef(null);

    /* States */
    const [userInputEmail, setUserInputEmail] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    /* Access states from redux store */
    const user = useSelector((state) => {
        return state.user.user;
    });
    const admin = useSelector((state) => {
        return state.admin.adminId;
    });

    /* Access actions from redux store */
    const dispatch = useDispatch();

    /* Navigate hook */
    const navigate = useNavigate();

    /* Handlers */
    const handleEmailInputChange = (userEmailInput) => {
        setUserInputEmail(userEmailInput);
    }

    const handlePasswordInputChange = (userPasswordInput) => {
        setUserInputPassword(userPasswordInput);
    }

    const handleValidation = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        /* Initialize variables and states */
        emailTextfieldRef.current.className = 'form-control email-textfield';      
        setEmailErrMsg("");
        passwordTextfieldRef.current.className = 'form-control email-textfield';
        setPasswordErrMsg("");

        /* Validate Email */
        if (userInputEmail === ''){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            setIsLoading(false);
            setEmailErrMsg("Email is Required");
            return;
        }
        if (!userInputEmail.includes("@")){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            setIsLoading(false);
            setEmailErrMsg("Incorrect Email Format");
            return;
        }

        /* Validate Password */
        if (userInputPassword === ''){
            passwordTextfieldRef.current.className = 'form-control is-invalid password-textfield';
            setIsLoading(false);
            setPasswordErrMsg("Password is Required");
            return;
        }

        /* Find the User in the database */
        const userInput = {
            email: userInputEmail,
            password: userInputPassword,
        };

        if (userInputEmail !== adminAccount.email && userInputEmail !== adminAccount.password){
            /* Login User */
            const url = "https://melon-web-project-server.vercel.app/login";
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(userInput),
            })
            .then((res) => {
                if (res.ok) {
                    /* Find the user in database successfully */
                    emailTextfieldRef.current.className = 'form-control email-textfield';
                    passwordTextfieldRef.current.className = 'form-control password-textfield';
                    setIsLoading(false);
                    // console.log('Login successful');
                    setEmailErrMsg("");
                    setPasswordErrMsg("");
                    dispatch(setToggle());
                    setIsLoading(false);

                    /* Display the toast */
                    toast.success(`Login Successful`, {
                        style: {
                            background: 'white',
                            color: 'black',
                        },
                    });
                    navigate('/home');

                } else {
                    /* Fail to find the user in database */
                    emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
                    passwordTextfieldRef.current.className = 'form-control is-invalid password-textfield';
                    setIsLoading(false);
                    setEmailErrMsg("Incorrect Email or Password");
                    setPasswordErrMsg("Incorrect Email or Password");
                    toast.error(`Login Failure`, {
                        style: {
                            background: 'white',
                            color: 'black',
                        },
                    });
                }
                return res.json();
            })
            .then((data) => {
                if (data.token){
                    /* Update the redux states */
                    delete data.user.password;
                    dispatch(setLogin({token:data.token, user:data.user, userPosts: data.userPosts}));

                } else {
                    console.log(data.message);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('Error during login:', err);
            });
        }
        else{
            /* Login Admin Account */
            const url = "https://melon-web-project-server.vercel.app/admin/login";
            await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInput),
            })
            .then((res) => {
                if (res.ok) {
                    /* Find the admin in database successfully */
                    emailTextfieldRef.current.className = 'form-control email-textfield';
                    passwordTextfieldRef.current.className = 'form-control password-textfield';
                    console.log('Login admin successful');
                    setEmailErrMsg("");
                    setPasswordErrMsg("");
                    setIsLoading(false);
                    navigate(`/admin`);
                } else {
                    /* Fail to find the admin in database */
                    emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
                    passwordTextfieldRef.current.className = 'form-control is-invalid password-textfield';
                    setEmailErrMsg("Incorrect Email or Password");
                    setPasswordErrMsg("Incorrect Email or Password");
                    setIsLoading(false);
                }
                return res.json();
            })
            .then((data) => {
                if (data.adminId){
                    dispatch(setAdmin({adminId: data.adminId, token: data.token}));
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('Error during login:', err);
            });

        }
    }

    const setLogoutUser = () => {
        dispatch(resetUserState());
        dispatch(resetPostState());
        dispatch(resetModalState());
        dispatch(resetSlideBarState());
    }

    const setLogoutAdmin = () => {
        dispatch(resetAdminState());
    }


    return (
        <div>

            {/* Loading spinner */}
            {isLoading && 
                (<div className="spinning-overlay">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)
            }

            {/* Display the Navbar */}
            <LoginNavbar />

            {/* Logout the user first when routing to Login page each time */}
            {(user) ? setLogoutUser() : null}
            {(admin) ? setLogoutAdmin() : null}
 
            <div className="login-container" id="container">
                <div className="grid-container">
                    {/* Column 1 */}

                    {/* UI design of Login page (image) */}
                    <div className="login-grid-item">
                        <img className="login-gird-picture" src={loginPic} alt="Login Page Melon Background Pciture" />
                    </div>
                
                    {/* Column 2 */}
                    <div className="form-container Signin-grid">
                        <h1 className="Signin-title"><strong>Melon</strong></h1>
                        <form action="/login" method="POST">

                            {/* UI design of Login page (social media icon) */}
                            <div className="social-icons">
                                <a href="https://www.google.com.hk/" className="icon"><i className="fa-brands fa-google"></i></a>
                                <a href="https://www.facebook.com/" className="icon"><i className="fa-brands fa-facebook"></i></a>
                                <a href="https://www.instagram.com/" className="icon"><i className="fa-brands fa-instagram"></i></a>
                            </div>

                            {/* 'Email' textfield */}
                            <div className="form-floating mb-3 login-email-container">
                                <input type="email" className="form-control email-textfield" id="floatingInput" placeholder="Email" ref={emailTextfieldRef} value={userInputEmail} onChange={(e)=>handleEmailInputChange(e.target.value)} required />
                                <label htmlFor="floatingInput">Email address</label>
                                <div className="errorMsg">{emailErrMsg}</div>
                            </div>

                            {/* 'Password' textfield */}
                            <div className="form-floating mb-3 login-password-container">
                                <input type="password" className="form-control password-textfield" id="floatingPassword" placeholder="Password" ref={passwordTextfieldRef} value={userInputPassword} onChange={(e)=>handlePasswordInputChange(e.target.value)} required/>
                                <label htmlFor="floatingPassword">Password</label>
                                <div className="errorMsg">{passwordErrMsg}</div>
                            </div>
                        
                            {/* Route to Register page if user do not have account */}
                            <div className="Signup-container">
                                <small>Do not have an account?</small>
                                <Link to="/register" className="login-signup-link"><strong>Sign up</strong></Link>
                                <br />
                            </div>

                            {/* Login button */}
                            <div className="login-button-container">
                                <button className="Signin-button" onClick={handleValidation}><strong>SIGN IN</strong></button>
                            </div>
                            
                        </form>
                    </div>
                </div>

                {/* UI design of Login page (background design) */}
                <div className="login-decoration">
                    <div className="rectangle-decoration">
                        <svg width="1920px" height="693px" >
                            {/* right rectangle */}
                            <rect x="1250" y="0" width="700" height="300" fill="#f4a8ac" />
                            {/* left rectangle */}
                            <rect x="0" y="430" width="700" height="200" fill="#f4a8ac" />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
        
    )
}

export default LoginPage;