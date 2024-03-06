import { useState, useRef, useEffect} from "react";
import RegisterImg from '../assets/register-img.jpeg';

const RegisterPage = () => {
    /* Reference on HTML element */
    const emailTextfieldRef = useRef(null);
    const passwordTextfieldRef = useRef(null);
    const comfirmedPasswordTextfieldRef = useRef(null);

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
        console.log("Email=",userInputEmail);
        console.log("Password=",userInputPassword);
        console.log("Comfirmed password=",userComfirmedInputPassword);

        /* Email Validation */
        if (userInputEmail === ''){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            setEmailErrMsg("Email is required");
        } else if (!userInputEmail.includes('@')){
            emailTextfieldRef.current.className = 'form-control is-invalid email-textfield';
            setEmailErrMsg("Invalid email format");
        } else {
            emailTextfieldRef.current.className = 'form-control email-textfield';
            setEmailErrMsg("");

            /* Password Validation */
            if (userInputPassword === ''){
                passwordTextfieldRef.current.className = 'form-control is-invalid password-textfield';
                setPasswordErrMsg("Password is required");
            } else {
                passwordTextfieldRef.current.className = 'form-control password-textfield';
                setPasswordErrMsg("");
            }
            if (userComfirmedInputPassword === ''){
                comfirmedPasswordTextfieldRef.current.className = 'form-control is-invalid comfirmed-password-textfield';
                setComfirmedPasswordErrMsg("Comfirmed password is required");
            } else {
                comfirmedPasswordTextfieldRef.current.className = 'form-control comfirmed-password-textfield';
                setComfirmedPasswordErrMsg("")
            }
            if (userInputPassword !== userComfirmedInputPassword){
                comfirmedPasswordTextfieldRef.current.className = 'form-control is-invalid comfirmed-password-textfield';
                setComfirmedPasswordErrMsg("Password is not consistent");
            }
        }

        /* Send the registration data back to server */ 

        



    }

    return ( 
            <div className="register-container">

                <div className="Follow-us-grid-container">
                    {/* Column 1 */}
                    <div className="follow-us-grid-col1">
                        <div className="text">
                            <span>Follow Us</span>
                            <br />
                            <label>Our Social Media</label>
                        </div>
                        <div className="social-icons-follow-us">
                            <a href="https://www.google.com.hk/" className="icon"><i className="fa-brands fa-google"></i></a>
                            <a href="https://www.facebook.com/" className="icon"><i className="fa-brands fa-facebook"></i></a>
                            <a href="https://www.instagram.com/" className="icon"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://www.instagram.com/" className="icon"><i className="fa-brands fa-square-twitter"></i></a>
                        </div>
                    </div>
                </div>


                <div className="register-grid-container">
                    {/* Column 1 */}
                    <div className="register-grid-col1">
                        <img className="login-gird-picture" src={RegisterImg} alt="Register Page Pciture" />
                    </div>


                    {/* Column 2 */}
                    <div className="register-grid-col2">
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
                            <form>
                                <div className="register-email-container">
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control email-textfield" id="floatingInput" placeholder="Email" ref={emailTextfieldRef} value={userInputEmail} onChange={(e)=>handleEmailInputChange(e.target.value)} required />
                                        <label htmlFor="floatingInput">Email address</label>
                                        <div className="errorMsg">{emailErrMsg}</div>
                                    </div>
                                </div>

                                <div className="register-password-container">
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control password-textfield" id="floatingPassword" placeholder="New Password" ref={passwordTextfieldRef} value={userInputPassword} onChange={(e)=>handlePasswordInputChange(e.target.value)} required/>
                                        <label htmlFor="floatingPassword">New Password</label>
                                        <div className="errorMsg">{passwordErrMsg}</div> 
                                    </div>
                                </div>

                                <div className="register-comfirmed-password-container">
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control comfirmed-password-textfield" id="floatingPassword" placeholder="Comfirm Password" ref={comfirmedPasswordTextfieldRef} value={userComfirmedInputPassword} onChange={(e)=>handleComfirmedPasswordInputChange(e.target.value)} required/>
                                        <label htmlFor="floatingPassword">Comfirmed Password</label>
                                        <div className="errorMsg">{comfirmedPasswordErrMsg}</div> 
                                    </div>
                                </div>

                                <div className="register-button-container">
                                    <button className="register-button" onClick={handleNewUser}><strong>SIGN UP</strong></button>
                                </div>
                        
                            </form>
                        </div>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="register-decoration">
                        <div className="rectangle-decoration">
                            <svg width="1920px" height="693px" >
                                {/* right rectangle */}
                                {/* <rect x="1250" y="0" width="700" height="300" fill="#f4a8ac" /> */}
                                {/* left rectangle */}
                                <rect x="700" y="55" width="350" height="620" fill="#f4a8ac" />
                            </svg>
                        </div>
                    </div>
            </div>
            
    );
}
 
export default RegisterPage;