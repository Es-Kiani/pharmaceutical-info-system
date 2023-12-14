import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./ControlPanelPage.css";
import DrugItem from "../components/DrugItem/DrugItem";

const ControlPanelPage = () => {
    const [isAdmin, setIsAdmin] = useState("user");
    const [en_name, setEn_name] = useState("");
    const [fa_name, setFa_name] = useState("");
    const [cure, setCure] = useState("");
    const [description, setDescription] = useState("");
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

    const submitHandler = (e) => {
        e.preventDefault();
        let newDrug = {
            en_name,
            fa_name,
            cure,
            description,
        };
        fetch("http://localhost:4000/drugs", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(newDrug),
        })
            .then((res) => {
                if (res.status === 201) {
                    getDrugsList();
                    setEn_name("");
                    setFa_name("");
                    setCure("");
                    setDescription("");
                }
            })
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
                            <a class="active" href="/controlpanel">
                                Control Panel
                            </a>
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

            <div className="bgdiv">
                <div className="dashboard">
                    <div className="l-sec">
                        <form
                            className="dashboard-form"
                            onSubmit={submitHandler}
                        >
                            <div className="dashboard-form__filed">
                                <label
                                    htmlFor="enName"
                                    className="dashboard-form__label"
                                >
                                    English name:
                                </label>
                            </div>
                            <div className="dashboard-form__filed">
                                <input
                                    type="text"
                                    className="dashboard-form__input"
                                    value={en_name}
                                    onChange={(e) => setEn_name(e.target.value)}
                                />
                            </div>

                            <div className="dashboard-form__filed">
                                <label
                                    htmlFor="prName"
                                    className="dashboard-form__label"
                                >
                                    Persian name:{" "}
                                </label>{" "}
                            </div>
                            <div className="dashboard-form__filed">
                                <input
                                    type="text"
                                    className="dashboard-form__input"
                                    value={fa_name}
                                    onChange={(e) => setFa_name(e.target.value)}
                                />
                            </div>

                            <div className="dashboard-form__filed">
                                <label
                                    htmlFor="use"
                                    className="dashboard-form__label"
                                >
                                    Usage:{" "}
                                </label>{" "}
                            </div>
                            <div className="dashboard-form__filed">
                                <input
                                    type="text"
                                    className="dashboard-form__input"
                                    value={cure}
                                    onChange={(e) => setCure(e.target.value)}
                                />
                            </div>

                            <div className="dashboard-form__filed">
                                <label
                                    htmlFor="info"
                                    className="dashboard-form__label"
                                >
                                    Information:{" "}
                                </label>{" "}
                            </div>
                            <div className="dashboard-form__filed">
                                <textarea
                                    cols="70"
                                    rows="7"
                                    className="dashboard-form__input"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>

                            <button
                                className="dashboard-form__btn"
                                disabled={
                                    fa_name && en_name && cure && description
                                        ? false
                                        : true
                                }
                            >
                                Add new drug{" "}
                            </button>
                        </form>
                    </div>

                    <div className="r-sec">
                        {drugsList ? (
                            drugsList.length ? (
                                drugsList.map((drug) => (
                                    <DrugItem
                                        key={drug.id}
                                        faName={drug.fa_name}
                                        enName={drug.en_name}
                                        cure={drug.cure}
                                        drugId={drug.id}
                                        adminPage={true}
                                        refresh={getDrugsList}
                                        showInfo={true}
                                        describtion={drug.describtion}
                                    />
                                ))
                            ) : (
                                <p className="noDrug">
                                    دیتابیس خالی است . . . !{" "}
                                </p>
                            )
                        ) : (
                            <p className="loading">Loading ...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ControlPanelPage;
