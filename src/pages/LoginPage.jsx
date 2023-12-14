import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState("user");

    let isLogin = Cookies.get("login");
    let navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            setIsAdmin(Cookies.get("login"));
            alert("You are Logged into your account already!");
            if (isAdmin === "admin") {
                navigate("/controlpanel");
            } else {
                navigate("/dashboard");
            }
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        fetch(`http://localhost:4000/users?email=${email}&password=${password}`)
            .then((res) => res.status === 200 && res.json())
            .then((data) => {
                // console.log(data);
                if (data.length && !isLogin) {
                    Cookies.set("login", data[0].role);
                    if (data[0].role === "user") {
                        navigate("/dashboard");
                    }
                    if (data[0].role === "admin") {
                        navigate("/controlpanel");
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="return">
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
                    <h2 className="h2">Welcome back</h2>
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-container">
                            <label
                                htmlFor="email"
                                className="login-filed__label"
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

                        <div className="input-container">
                            <label
                                htmlFor="password"
                                className="login-filed__label"
                            >
                                Password:
                            </label>
                            <input className="input"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <div className="rememberme">
                            <input type="checkbox" />
                            <label className="label" htmlFor="rememberme">
                                Remember Me
                            </label>
                        </div>

                        <button
                            className="button"
                            disabled={email && password ? false : true}
                        >
                            Login
                        </button>
                    </form>

                    <div className="login-with">
                        <a href="/login/#">
                            <img
                                src={require("../images/icons8-facebook-100.png")}
                            />
                        </a>

                        <a href="/login/#">
                            <img
                                src={require("../images/icons8-google-100.png")}
                            />
                        </a>

                        <a href="/login/#">
                            <img
                                src={require("../images/icons8-twitter-squared-100.png")}
                            />
                        </a>
                    </div>

                    <div>
                        <a className="lrtt" href="/register">
                            Do not have an account?
                        </a>

                        <a className="lrtt" href="/login/resetpassword">
                            Forget your password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
