import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem/PostItem";
import "./DashboardPage.css";

const DashboardPage = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [newsText, setDescription] = useState("");
    const [postsList, setPostsList] = useState();
    
    const [isAdmin, setIsAdmin] = useState("user");
    let isLogin = Cookies.get("login");

    useEffect(() => {
        if (isLogin) {
            setIsAdmin(Cookies.get("login"));
        }
        getPostsList();
    }, []);

    const getPostsList = () => {
        fetch("http://localhost:4000/posts?_sort=id&_order=desc")
            .then((res) => res.json())
            .then((data) => setPostsList(data))
            .catch((err) => console.log(err));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let newPost = {
            title,
            author,
            newsText};
        fetch("http://localhost:4000/posts", {
            headers: {
                "Content-Type": "application/json",},
            method: "POST",
            body: JSON.stringify(newPost),})
            .then((res) => {
                if (res.status === 201) {
                    getPostsList();
                    setTitle("");
                    setAuthor("");
                    setDescription("");}})
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
                        <a href="/blog">
                            Blog
                        </a>
                    </li>
                    {isLogin ? (
                        <li>
                            <a class="active" href="/dashboard">
                                Dashboard
                            </a>
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

            <div className="bgdiv">
                <div className="dashboard">
                    <div className="l-sec">
                        <form
                            className="dashboard-form-d"
                            onSubmit={submitHandler}
                        >
                            <div className="dashboard-form__filed">
                                <label
                                    htmlFor="title"
                                    className="dashboard-form__label"
                                >
                                    Title:
                                </label>
                            </div>
                            <div className="dashboard-form__filed">
                                <input type="text"
                                    className="dashboard-form__input"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="dashboard-form__filed">
                                <label
                                    htmlFor="author"
                                    className="dashboard-form__label"
                                >
                                    Author:{" "}
                                </label>{" "}
                            </div>
                            <div className="dashboard-form__filed">
                                <input type="text"
                                    className="dashboard-form__input"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            
                            <div className="dashboard-form__filed">
                                <label
                                    htmlFor="newsText"
                                    className="dashboard-form__label"
                                >
                                    News text:{" "}
                                </label>{" "}
                            </div>
                            <div className="dashboard-form__filed">
                                <textarea
                                    cols="70"
                                    rows="7"
                                    className="dashboard-form__input"
                                    value={newsText}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>

                            <button
                                className="dashboard-form__btn"
                                disabled={
                                    author && title && newsText
                                        ? false
                                        : true
                                }
                            >
                                Add new post{" "}
                            </button>
                        </form>
                    </div>

                    <div className="r-sec">

                        {postsList ? (
                            postsList.length ? (
                                postsList.map((post) => (
                                    <PostItem
                                        key={post.id}
                                        author={post.author}
                                        title={post.title}
                                        newsText={post.newsText}
                                        postID={post.id}
                                        adminPage={true}
                                        refresh={getPostsList}
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

export default DashboardPage;
