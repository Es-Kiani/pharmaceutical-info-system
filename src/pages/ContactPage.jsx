import React, { useState, useEffect } from "react";
import "./ContactPage.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ContactPage() {
    const [isAdmin, setIsAdmin] = useState("user");
    const navigate = useNavigate();

    let isLogin = Cookies.get("login");

    useEffect(() => {
        if (isLogin) {
            setIsAdmin(Cookies.get("login"));
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your message has sent!")
        navigate(0);
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
                        <a class="active" href="/contact">
                            Get in Touch
                        </a>
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
                            <a href="/register">Register</a>
                        </li>
                    )}
                </ul>
            </div>

            <div className="contact-container">
                <div className="container">
                    {" "}
                    <div className="section left-section">
                        <h2 className="section-title">
                            Contact Information
                        </h2>
                        <div className="contact-row">
                            <a href="tel:09120998129">
                                <img
                                    src={require("../images/icons8-phone2-100.png")}
                                    className="GiTpics"
                                />
                            </a>
                            <a href="tel:09120998129" className="contact-a">
                                <p className="info">0912-099-8129</p>
                            </a>
                        </div>

                        <div className="contact-row">
                            <a className="contact-a" href="">
                                <img
                                    src={require("../images/icons8-location2-100.png")}
                                    className="GiTpics"
                                />
                            </a>
                            <a href="" className="contact-a">
                                <p className="info">Persia, Isfahan</p>
                            </a>
                        </div>

                        <div className="contact-row">
                            <a
                                className="contact-row-a"
                                href="mailto:daroo@gmail.com"
                            >
                                <img
                                    src={require("../images/icons8-mail1-100.png")}
                                    className="GiTpics"
                                />
                            </a>
                            <a
                                href="mailto:daroo@gmail.com"
                                className="contact-a"
                            >
                                <p className="info">Daroo@gmail.com</p>
                            </a>
                        </div>

                        <p className="info lastinfo"></p>
                    </div>

                    <div className="section right-section">
                        <form
                            className="contact-form"
                            onSubmit={handleSubmit}
                            method="POST"
                        >
                            <div className="form-row">
                                <div className="form-group">
                                    <label
                                        for="firstName"
                                        className="form-label"
                                    >
                                        First Name:
                                    </label>

                                    <input type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="form-input"
                                        placeholder="Sherlock"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label for="lastName"
                                        className="form-label"
                                    >
                                        Last Name:
                                    </label>

                                    <input type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="form-input"
                                        placeholder="Holmes"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label for="email"
                                        className="form-label">
                                        Email:
                                    </label>

                                    <input type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="Sh.Holmes@221Bauk"
                                        required
                                    />
                            </div>

                            <div className="form-group">
                                <label for="phone"
                                    className="form-label">
                                    Phone:
                                </label>

                                <input type="text"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    placeholder="0912-099-8129"
                                />
                            </div>
                            </div>

                            <div className="form-row priority">
                                <div className="form-group priority">
                                    <label className="form-label">
                                        Priority:
                                    </label>

                                    <label for="priorityHigh"
                                        className="radio-label"
                                    >
                                        <input type="radio"
                                            id="priorityHigh"
                                            name="priority"
                                            value="High"
                                        />
                                        High {"  "}
                                    </label>
                                    <label for="priorityMedium"
                                        className="radio-label"
                                    >
                                        <input
                                            type="radio"
                                            id="priorityMedium"
                                            name="priority"
                                            value="Medium"
                                        />
                                        Medium {"  "}
                                    </label>
                                    <label for="priorityLow"
                                        className="radio-label"
                                    >
                                        <input
                                            type="radio"
                                            id="priorityLow"
                                            name="priority"
                                            value="Low"
                                        />
                                        Low {"  "}
                                    </label>
                                </div>
                            </div>

                            <div className="form-row priority">
                                <div className="form-group priority">
                                    <label for="message" className="form-label">
                                        How can we help you?
                                    </label>

                                    <textarea id="message"
                                        name="message"
                                        className="form-textarea"
                                        rows="5"
                                        placeholder="Hello dear, ..."
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            
                            <button type="submit" className="form-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
