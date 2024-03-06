import { useState, useRef, useEffect} from "react";

const RegisterPage = () => {
    /* Reference on HTML element */
    const emailTextfieldRef = useRef(null);
    const passwordTextfieldRef = useRef(null);

    /* States */
    const [userInputEmail, setUserInputEmail] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");

    /* Handlers */
    const handleEmailInputChange = (userEmailInput) => {
        setUserInputEmail(userEmailInput);
    }

    const handlePasswordInputChange = (userPasswordInput) => {
        setUserInputPassword(userPasswordInput);
    }

    return ( 

  
            <div className="register-container">
                <div className="register-grid-container">
                    {/* Register form */}
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


                    {/* Background decoration */}
                    <div className="register-decoration">
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
            
    );
}
 
export default RegisterPage;