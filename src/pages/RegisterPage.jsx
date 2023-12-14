import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState("user");

    let navigate = useNavigate();
    let isLogin = Cookies.get("login");

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

    const handleSubmit = (e) => {
        e.preventDefault();

        let newUser = {
            name,
            phone,
            email,
            password,
            role: "user",
        };

        const loggedin = Cookies.get("login");
        if (loggedin) {
            navigate("/");
        } else {
            fetch("http://localhost:4000/users", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(newUser),
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 201) {
                        // alert("Your account created... Lets Login");
                        alert("Your are logged in into your acount...!");
                        Cookies.set("login", "user");
                        // navigate("/login");
                        navigate("/dashboard");
                    }
                })
                .catch((err) => console.log(err));
        }
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
                            <a href="/login">Login</a>
                        </li>
                    )}
                    {isLogin ? (
                        <></>
                    ) : (
                        <li className="lstChld">
                            <a class="active" href="/register">
                                Register
                            </a>
                        </li>
                    )}
                </ul>
            </div>

            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2 className="hh">User Register</h2>
                    <div className="form-groupR">
                        <label className="label" htmlFor="name">
                            Full Name
                        </label>
                        <input className="input"
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            placeholder="Sherlock Holmes"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-groupR">
                        <label className="label" htmlFor="phone">
                            Phone Number
                        </label>
                        <input className="input"
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="0912-345-6789"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="form-groupR">
                        <label className="label" htmlFor="email">
                            Email
                        </label>
                        <input className="input"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Sh.Holmes@221Baker.uk"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-groupR-passwd1 form-groupR">
                        <label className="label" htmlFor="password">
                            Password
                        </label>
                    </div>

                    <div className="form-groupR-passwd2 form-groupR">
                        <input className="inputpasswd"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="/register/passgen">
                            <img
                                src={require("../images/icons8-lock.png")}
                                className="passgen"
                            />
                        </a>
                    </div>

                    <button
                        className="button"
                        type="submit"
                        disabled={name && email && password ? false : true}
                    >
                        Register
                    </button>
                    
                    <a className="lrtt" href="/login">
                        Do you have an account?
                    </a>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
