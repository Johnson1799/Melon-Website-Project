/* import React */
import { useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

/* Import useFetch custom hook */
import useFetch from './useFetch.js';

/* Import assets */
import loginPic from '../assets/loginPic.png';         // 490*367



const LoginPage = () => {
    // ref hook
    const emailTextfieldRef = useRef(null);
    const passwordTextfieldRef = useRef(null);

    // state hook
    const [user, setUser] = useState(null);
    const [userInputEmail, setUserInputEmail] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");

    // Navigate hook
    const navigate = useNavigate();

    // fetch data from server
    const id = '65e6bbff273f1dac63ae3aa9';
    const url = `http://localhost:3001/users/${id}`;
    const {data:User,isLoading} = useFetch(url);
    useEffect(() => {
        setUser(User); 
    }, [User]);

    /* Handlers */
    const handleEmailInputChange = (userEmailInput) => {
        setUserInputEmail(userEmailInput);
    }

    const handlePasswordInputChange = (userPasswordInput) => {
        setUserInputPassword(userPasswordInput);
    }

    const handleValidation = (e) => {
        e.preventDefault();

        /* Validate Email */
        if (userInputEmail === ''){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            setEmailErrMsg("Email is Required");
        }
        else if (!userInputEmail.includes("@")){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            setEmailErrMsg("Incorrect Email Format");
        }
        else if (userInputEmail !== user.email){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            passwordTextfieldRef.current.className = 'form-control is-invalid password-textfield';
            setEmailErrMsg("Incorrect Email or Password");
            setPasswordErrMsg("Incorrect Email or Password");
        }
        else{
            emailTextfieldRef.current.className = 'form-control email-textfield';
            setEmailErrMsg("");


            /* Validate Password */
            if (userInputPassword === ''){
                passwordTextfieldRef.current.className = 'form-control is-invalid password-textfield';
                setPasswordErrMsg("Password is Required");
            }
            else if (userInputPassword !== user.password){
                passwordTextfieldRef.current.className = 'form-control is-invalid password-textfield';
                emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
                setPasswordErrMsg("Incorrect Email or Password");
                setEmailErrMsg("Incorrect Email or Password");
            }
            else{
                passwordTextfieldRef.current.className = 'form-control email-textfield';
                setPasswordErrMsg("");
                navigate("/home");
            }
        }

        
    }

    return (
        <div className="login-container" id="container">
            { isLoading && <div>Loading...</div>}
            <div className="grid-container">

                {/* Column 1 */}
                <div className="login-grid-item">
                    <img className="login-gird-picture" src={loginPic} alt="Login Page Melon Background Pciture" />
                </div>
            
                {/* Column 2 */}
                <div className="form-container Signin-grid">
                    <h1 className="Signin-title"><strong>Melon</strong></h1>
                    <form>
                        <div className="social-icons">
                            <a href="https://www.google.com.hk/" className="icon"><i className="fa-brands fa-google"></i></a>
                            <a href="https://www.facebook.com/" className="icon"><i className="fa-brands fa-facebook"></i></a>
                            <a href="https://www.instagram.com/" className="icon"><i className="fa-brands fa-instagram"></i></a>
                        </div>


                        <div className="form-floating mb-3 login-email-container">
                            <input type="email" className="form-control email-textfield" id="floatingInput" placeholder="Email" ref={emailTextfieldRef} value={userInputEmail} onChange={(e)=>handleEmailInputChange(e.target.value)} required />
                            <label htmlFor="floatingInput">Email address</label>
                            <div className="errorMsg">{emailErrMsg}</div>
                        </div>
                        <div className="form-floating mb-3 login-password-container">
                            <input type="password" className="form-control password-textfield" id="floatingPassword" placeholder="Password" ref={passwordTextfieldRef} value={userInputPassword} onChange={(e)=>handlePasswordInputChange(e.target.value)} required/>
                            <label htmlFor="floatingPassword">Password</label>
                            <div className="errorMsg">{passwordErrMsg}</div>
                        </div>
                      

                        <div className="Signup-container">
                            <small>Do not have an account?</small>
                            <Link to="/signup" className="login-signup-link"><strong>Sign up</strong></Link>
                            <br />
                        </div>
                        <div className="login-button-container">
                            <button className="Signin-button" onClick={handleValidation}><strong>SIGN IN</strong></button>
                        </div>
                        
                    </form>
                </div>
            </div>

            <div className="login-decoration">
                <div className="rectangle-1">
                    <svg width="1920px" height="1080" >
                        <rect x="1250" y="180" width="700" height="300" fill="#db545a" />
                        <rect x="0" y="600" width="700" height="200" fill="#db545a" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;