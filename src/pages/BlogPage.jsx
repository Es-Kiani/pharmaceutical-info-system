import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import PostItem from "../components/PostItem/PostItem";

const BlogPage = () => {
    const [isAdmin, setIsAdmin] = useState("user");
    const [postsList, setpostsList] = useState();

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
            .then((data) => setpostsList(data))
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
                        <a class="active" href="/blog">
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

            <div className="container-2">
                {" "}
                <div className="drugSecTitleDiv">
                    <h2 className="drugSecTitle">Blog</h2>
                </div>
                {" "}
                <div className="post-sec">
                {postsList ? (
                            postsList.length ? (
                                postsList.map((post) => (
                                    <PostItem
                                        key={post.id}
                                        author={post.author}
                                        title={post.title}
                                        newsText={post.newsText}
                                        postID={post.id}
                                        forDelete={false}
                                        reloadData={getPostsList}
                                    />
                                ))
                            ) : (
                                <p className="noDrug">
                                    دیتابیس خالی است . . . !{" "}
                                </p>
                            )
                        ):(
                            <p className="loading">Loading ...</p>
                        )}
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
                    </a>
                    {" "}
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

export default BlogPage;
