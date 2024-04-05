/* Import react library */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* Import assets */
import RegisterImg from '../assets/register-img.jpeg';

/* Import components */
import LoginNavbar from "components/Navbar/LoginNavbar.jsx";

const adminEmail = 'admin@admin';

const RegisterPage = () => {
    /* Reference to HTML tag */
    const emailTextfieldRef = useRef(null);
    const passwordTextfieldRef = useRef(null);
    const comfirmedPasswordTextfieldRef = useRef(null);

    /* Navigation hook */
    const navigate = useNavigate();

    /* States */
    const [userInputEmail, setUserInputEmail] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");
    const [userComfirmedInputPassword, setUserConfirmedInputPassword] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");
    const [comfirmedPasswordErrMsg, setComfirmedPasswordErrMsg] = useState("");

    /* Handlers */
    const handleEmailInputChange = (userEmailInput) => {
        setUserInputEmail(userEmailInput);
    }
    const handlePasswordInputChange = (userPasswordInput) => {
        setUserInputPassword(userPasswordInput);
    }
    const handleComfirmedPasswordInputChange = (userPasswordInput) => {
        setUserConfirmedInputPassword(userPasswordInput);
    }

    const handleNewUser = (e) => {
        e.preventDefault();

        /* Initialize variables and states */
        let emailIsValid = true;
        let passwordIsValid = true;
        let comfirmedPasswordIsValid = true;
        emailTextfieldRef.current.className = 'form-control email-textfield';
        setEmailErrMsg("");
        passwordTextfieldRef.current.className = 'form-control password-textfield';
        setPasswordErrMsg("");
        comfirmedPasswordTextfieldRef.current.className = 'form-control comfirmed-password-textfield';
        setComfirmedPasswordErrMsg("");

        
        /* Email Validation */
        if (userInputEmail === ''){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            setEmailErrMsg("Email is required");
            emailIsValid = false;
        }
        if (!userInputEmail.includes('@') || userInputEmail === adminEmail){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            setEmailErrMsg("Invalid email format");
            emailIsValid = false;
        }

        /* Password Validation */
        if (userInputPassword === ''){
            passwordTextfieldRef.current.className = 'form-control is-invalid password-textfield';
            setPasswordErrMsg("Password is required");
            passwordIsValid=false;
        }
        if (userComfirmedInputPassword === ''){
            comfirmedPasswordTextfieldRef.current.className = 'form-control is-invalid comfirmed-password-textfield';
            comfirmedPasswordIsValid = false;
            setComfirmedPasswordErrMsg("Comfirmed password is required");
        }
        if (userInputPassword !== userComfirmedInputPassword) {
            comfirmedPasswordTextfieldRef.current.className = 'form-control is-invalid comfirmed-password-textfield';
            comfirmedPasswordIsValid = false;
            setComfirmedPasswordErrMsg("Password is not consistent");
        } 

        /* Send the registration data back to server */ 
        if (emailIsValid && passwordIsValid && comfirmedPasswordIsValid){
            const updatedUser = {
                email: userInputEmail,
                password: userInputPassword,
            };

            /* Server route url */
            const url = "https://csci-3100-project.vercel.app/register";
            fetch(url,{
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(updatedUser),
            })
            .then(res => {
                if (res.ok) {
                    /* When registration success */
                    emailTextfieldRef.current.className = 'form-control email-textfield';
                    setEmailErrMsg("");
                    emailIsValid = true;
                    navigate("/");
                } else {
                    /* When registration failed */
                    emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
                    setEmailErrMsg("This email has been registered");
                    emailIsValid = false;
                }
                
                return res.json();
            })
            .then(data => {
                /* Display registration status message */
                console.log(data.message);
            })
            .catch(err => {
                console.log('Error: ', err);
            });
        }
    }

    return ( 
        <div>
            {/* Display the Navbar */}
            <LoginNavbar />

            <div className="register-container">
                {/* Column 1 */}
                <div className="Follow-us-grid-container">
                    {/* UI design of Register page (leftmost grid design) */}
                    <div className="follow-us-grid-col1">
                        <div className="text">
                            <span>Follow Us</span>
                            <br />
                            <label>Our Social Media</label>
                        </div>
                        <div className="social-icons-follow-us">
                            <a href="https://www.google.com/" className="icon"><i className="fa-brands fa-google"></i></a>
                            <a href="https://www.facebook.com/" className="icon"><i className="fa-brands fa-facebook"></i></a>
                            <a href="https://www.instagram.com/" className="icon"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://twitter.com/" className="icon"><i className="fa-brands fa-square-x-twitter"></i></a>
                        </div>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="register-grid-container">
                    {/* Column 2.1 */}

                    {/* UI design of Register page (image) */}
                    <div className="register-grid-col1">
                        <img className="login-gird-picture" src={RegisterImg} alt="Register Page Pciture" />
                    </div>


                    {/* Column 2.2 */}
                    <div className="register-grid-col2">

                        {/* UI design of Register page (rightmost grid design) */}
                        <div className="text-container-1">
                            <span className="title">Melon</span>
                        </div>
                        <div className="text-container-2">
                            <span className="text">Create a Melon Account</span>
                        </div>


                        <div className="social-network-register-container">
                            <div className="text">
                                <span>Sign up with your social network</span>
                                <br />
                            </div>

                            <div className="social-icons">
                                <a href="https://www.google.com.hk/" className="icon"><i className="fa-brands fa-google"></i></a>
                                <a href="https://www.facebook.com/" className="icon"><i className="fa-brands fa-facebook"></i></a>
                                <a href="https://www.instagram.com/" className="icon"><i className="fa-brands fa-instagram"></i></a>
                            </div>

                            <div className="horizontal-line">
                                <hr />
                                    <span className="line-text">Or</span>
                                <hr />
                            </div>

                        </div>


                        <div className="register-form-container">
                            <form action="/register" method="POST">
                                {/* 'Email' textfield */}
                                <div className="register-email-container">
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control email-textfield" id="floatingInput" name="registerEmail" placeholder="Email" ref={emailTextfieldRef} value={userInputEmail} onChange={(e)=>handleEmailInputChange(e.target.value)} required />
                                        <label htmlFor="floatingInput">Email address</label>
                                        <div className="errorMsg">{emailErrMsg}</div>
                                    </div>
                                </div>

                                {/* 'Password' textfield */}
                                <div className="register-password-container">
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control password-textfield" id="floatingPassword" name="registerPassword" placeholder="New Password" ref={passwordTextfieldRef} value={userInputPassword} onChange={(e)=>handlePasswordInputChange(e.target.value)} required/>
                                        <label htmlFor="floatingPassword">New Password</label>
                                        <div className="errorMsg">{passwordErrMsg}</div> 
                                    </div>
                                </div>

                                {/* 'Comfirmed password' textfield */}
                                <div className="register-comfirmed-password-container">
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control comfirmed-password-textfield" id="floatingComfirmedPassword" placeholder="Comfirm Password" ref={comfirmedPasswordTextfieldRef} value={userComfirmedInputPassword} onChange={(e)=>handleComfirmedPasswordInputChange(e.target.value)} required/>
                                        <label htmlFor="floatingComfirmedPassword">Comfirmed Password</label>
                                        <div className="errorMsg">{comfirmedPasswordErrMsg}</div> 
                                    </div>
                                </div>

                                {/* 'Sign up' button */}
                                <div className="register-button-container">
                                    <button className="register-button" onClick={handleNewUser}><strong>SIGN UP</strong></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* UI design of Login page (background design) */}
                <div className="register-decoration">
                    <div className="rectangle-decoration">
                        <svg width="1920px" height="693px" >
                            <rect x="720" y="48" width="350" height="620" fill="#f4a8ac" />
                        </svg>
                    </div>
                </div>
                
            </div>
        </div>
            
    );
}
 
export default RegisterPage;