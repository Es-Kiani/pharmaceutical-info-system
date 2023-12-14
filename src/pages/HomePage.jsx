import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import DrugItem from "../components/DrugItem/DrugItem";

const HomePage = () => {
    const [isAdmin, setIsAdmin] = useState("user");
    const [drugsList, setDrugsList] = useState();

    let isLogin = Cookies.get("login");

    useEffect(() => {
        if (isLogin) {
            setIsAdmin(Cookies.get("login"));
        }
        getDrugsList();
    }, []);

    const getDrugsList = () => {
        fetch("http://localhost:4000/drugs?_sort=id&_order=desc")
            .then((res) => res.json())
            .then((data) => setDrugsList(data))
            .catch((err) => console.log(err));
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
                        <a class="active" href="/home">
                            Home
                        </a>
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
                            <a href="/register">Register</a>
                        </li>
                    )}
                </ul>
            </div>

            <div className="container-1">
                <div className="newsSecTitleDiv">
                    <h2 className="newsSecTitle">Top Medical News</h2>
                </div>

                <div className="newsDiv">
                    <div className="news-1">
                        <img
                            className="breakingNews"
                            src={require("../images/800_3945287_rudp1onpnq64uu15knr0owxdc9zh55wdk7tvnqnz_announcement-of-breaking-news-icon-flat-style.jpg")}
                        />

                        <h3 className="newsTitle">کشف دارو سرطان</h3>

                        <a href="/blog" className="blogBtn">
                            More news
                        </a>
                    </div>

                    <div className="news-2">
                        <img
                            className="breakingNews"
                            src={require("../images/800_3945287_rudp1onpnq64uu15knr0owxdc9zh55wdk7tvnqnz_announcement-of-breaking-news-icon-flat-style.jpg")}
                        />

                        <h3 className="newsTitle">واکسن کرونا ساخته شد</h3>

                        <a href="/blog" className="blogBtn">
                            More news
                        </a>
                    </div>

                    <div className="news-3">
                        <img
                            className="breakingNews"
                            src={require("../images/800_3945287_rudp1onpnq64uu15knr0owxdc9zh55wdk7tvnqnz_announcement-of-breaking-news-icon-flat-style.jpg")}
                        />

                        <h3 className="newsTitle">!نانو ربات ها در خون شما</h3>

                        <a href="/blog" className="blogBtn">
                            More news
                        </a>
                    </div>
                </div>
            </div>

            <div className="container-2">
                {" "}
                <div className="drugSecTitleDiv">
                    <h2 className="drugSecTitle">Drugs Information Database</h2>
                </div>
                {" "}
                <div className="drug-sec">
                    {drugsList ? (
                        drugsList.length ? (
                            drugsList.map((drug) => (
                                <DrugItem
                                    key={drug.id}
                                    faName={drug.fa_name}
                                    enName={drug.en_name}
                                    cure={drug.cure}
                                    drugId={drug.id}
                                    adminPage={false}
                                    refresh={getDrugsList}
                                    showInfo={false}
                                    describtion={drug.describtion}
                                />
                            ))
                        ) : (
                            <p className="noDrug">دیتابیس خالی است . . . ! </p>
                        )
                    ) : (
                        <p className="loading">Loading ...</p>
                    )}
                </div>
            </div>

            <div className="container-3">
                <div className="Q-L-Sec">
                    <h1 className="Home-Q-Title">Have A Question?</h1>
                    <h2 className="Home-Q-Text">
                        Thank You for your interest.
                    </h2>
                    <h3 className="Home-Q-Text">
                        Do you have any question or suggestion? So, let we
                        know...
                        <br></br>
                        Be sure we always do our best! 😉
                    </h3>
                </div>

                <div className="Q-R-Sec">
                    <a href="/contact" className="home-contact-btn">
                        Say Your Opinion
                    </a>
                </div>
            </div>

            <div className="footer">
                <div className="footer-row-1">
                    <a className="footer-img-a" href="/#">
                        <img
                            className="footer-img"
                            src={require("../images/icons8-facebook1-100.png")}
                        />
                    </a>
                    {" "}
                    <a className="footer-img-a" href="/#">
                        <img
                            className="footer-img"
                            src={require("../images/icons8-instagram-100.png")}
                        />
                    </a>{" "}
                    <a className="footer-img-a" href="/#">
                        <img
                            className="footer-img"
                            src={require("../images/icons8-linkedin-100.png")}
                        />
                    </a>
                </div>

                <div className="footer-row-2">
                    <a href="/#">Info</a>
                    {" . "}
                    <a href="/#">Support</a>
                    {" . "}
                    <a href="/#">Marketing</a>
                </div>

                <div className="footer-row-3">
                    <a href="/#">Terms of Use</a>
                    {" . "}
                    <a href="/#">Privacy Policy</a>
                </div>

                <div className="footer-row-4">
                    <p>&copy; 2023 All Rights Reserved. Esfandiar Kiani</p>
                </div>
            </div>
        </>
    );
};

export default HomePage;
