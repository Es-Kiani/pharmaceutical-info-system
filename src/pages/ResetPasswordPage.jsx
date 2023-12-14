import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState("user");

    let navigate = useNavigate();
    let isLogin = Cookies.get("login");

    useEffect(() => {
        if (isLogin) {
            setIsAdmin(Cookies.get("login"));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your password was reset!");
        navigate("/login");
    };

    return (
        <>
            <div className="navbar">
                <ul>
                    <li className="frsChld">
                        <img
                            className="navbarLogo"
                            src={require("../images/icons8-pills1-100.png")}
                        />
                    </li>

                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/blog">
                            Blog
                        </a>
                    </li>
                    {isLogin ? (
                        <li>
                            <a href="/dashboard">Dashboard</a>
                        </li>
                    ) : (
                        <></>
                    )}
                    {isAdmin === "admin" ? (
                        <li>
                            <a href="/controlpanel">Control Panel</a>
                        </li>
                    ) : (
                        <></>
                    )}
                    <li>
                        <a href="/contact">Get in Touch</a>
                    </li>
                    <li>
                        <a href="/about">About us</a>
                    </li>

                    {isLogin ? (
                        <li className="lstChld">
                            <a href="/logout">Logout</a>
                        </li>
                    ) : (
                        <li className="lstChld">
                            <a class="active" href="/login">
                                Login
                            </a>
                        </li>
                    )}
                    {isLogin ? (
                        <></>
                    ) : (
                        <li className="lstChld">
                            <a href="/register">Register</a>
                        </li>
                    )}
                </ul>
            </div>

            <div className="login-container">
                <div className="login-box">
                    <h2 className="h2">Forget Password</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label
                                htmlFor="email"
                                className="rstpss-filed__label"
                            >
                                E-Mail:
                            </label>
                            <input className="input"
                                type="email"
                                placeholder="Hello@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            className="reset-passwd"
                            disabled={email ? false : true}
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPasswordPage;
