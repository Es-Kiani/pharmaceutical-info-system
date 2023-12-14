import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./DrugInfoPage.css";

const DrugInfoPage = () => {
    const [isAdmin, setIsAdmin] = useState("user");
    const [chosenDrug, setChosenDrug] = useState();
    const { drugId } = useParams();

    let navigate = useNavigate();
    let isLogin = Cookies.get("login");

    useEffect(() => {
        if (isLogin) {
            setIsAdmin(Cookies.get("login"));
        }

        fetch(`http://localhost:4000/drugs/${drugId}`)
            .then((res) => res.json())
            .then((data) => setChosenDrug(data))
            .catch((err) => console.log(err));
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
                    </li>
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

            {chosenDrug ? (
                <div className="chosenDrug">
                    <div className="chosenDrug-filed">
                        <label className="chosenDrug-filed__label">
                            نام عملی :
                        </label>
                        <p className="chosenDrug-filed__answer">
                            {chosenDrug.en_name}
                        </p>
                    </div>
                    <div className="chosenDrug-filed">
                        <label className="chosenDrug-filed__label">
                            نام دارو :
                        </label>
                        <p className="chosenDrug-filed__answer">
                            {chosenDrug.fa_name}
                        </p>
                    </div>
                    <div className="chosenDrug-filed">
                        <label className="chosenDrug-filed__label">
                            درمان :
                        </label>
                        <p className="chosenDrug-filed__answer">
                            {chosenDrug.cure}
                        </p>
                    </div>
                    <div className="chosenDrug-filed">
                        <label className="chosenDrug-filed__label">
                            توضیحات:
                        </label>
                        <p className="chosenDrug-filed__answer">
                            {chosenDrug.describtion}
                        </p>
                    </div>
                </div>
            ) : (
                <p className="loading">Loading ...</p>
            )}

            <div className="footer">
                <div className="footer-row-1">
                    <a className="footer-img-a" href="/#">
                        <img
                            className="footer-img"
                            src={require("../images/icons8-facebook1-100.png")}
                        />
                    </a>{" "}
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

export default DrugInfoPage;
