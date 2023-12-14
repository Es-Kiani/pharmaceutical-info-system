import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./AboutPage.css";

const AboutPage = () => {
    const [isAdmin, setIsAdmin] = useState("user");

    let isLogin = Cookies.get("login");

    useEffect(() => {
        if (isLogin) {
            setIsAdmin(Cookies.get("login"));
        }
    }, []);

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
                    </li>{" "}
                    <li>
                        <a href="/blog">Blog</a>
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
                        <a class="active" href="/about">
                            About us
                        </a>
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

            <div className="about-container">
                <div className="content">
                    <div className="about-title">
                        <h2>Nice to Meet You</h2>
                    </div>

                    <div className="about-text">
                        <p>
                            The Comprehensive Drug Information System is
                            dedicated to providing the latest and most
                            up-to-date information on pharmaceuticals. We are
                            committed to collecting, organizing, and presenting
                            accurate and understandable data on drugs and their
                            effects.
                        </p>
                        <p>
                            Our expert team consists of individuals with
                            experience in both medical and information
                            technology fields. Our goal is to promote public
                            awareness and create reliable resources for choosing
                            and using medications on the path to improving
                            health and quality of life.
                        </p>
                        <p>
                            Stay with us and take advantage of our accurate and
                            up-to-date information for better decision-making
                            regarding your health.
                        </p>
                    </div>
                    
                    <div className="contact-btn-p">
                        <a href="/contact" className="contact-btn">
                            Contact us
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
