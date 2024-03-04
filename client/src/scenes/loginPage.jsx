/* import React */
import { useState } from "react";
import { Link } from "react-router-dom";

/* Import assets */
import loginPic from '../assets/loginPic.png';         // 490*367



const LoginPage = () => {
    // state hook


    return (
        <div className="login-container" id="container">
            <div className="grid-container">

                <div className="login-grid-item">
                    <img className="login-gird-picture" src={loginPic} alt="Login Page Melon Background Pciture" />
                </div>
            
                <div className="form-container Signin-grid">
                <h1 className="Signin-title"><strong>Melon</strong></h1>
                    <form>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook"></i></a>
                            <a href="#" className="icon"><i class="fa-brands fa-instagram"></i></a>
                        </div>

                        <div class="form-floating mb-3 login-email-container">
                            <input type="email" className="form-control email-textfield" id="floatingInput" placeholder="Email" />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3 login-password-container">
                            <input type="password" className="form-control password-textfield" id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <br />

                        <div className="Signup-container">
                            <small>Do not have an account?</small>
                            <Link to="/signup" className="login-signup-link"><strong>Sign up</strong></Link>
                            <br />
                        </div>
                        <button className="Signin-button"><strong>SIGN IN</strong></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;