import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./PassgenPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PassgenPage = () => {
    const [password, setPassword] = useState("");
    const [passwordLength, setPasswordLength] = useState(26);
    const [includeUpperCase, setIncludeUpperCase] = useState(false);
    const [includeLowerCase, setIncludeLowerCase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);

    const numbers = "0123456789";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";

    const [isAdmin, setIsAdmin] = useState("user");

    let navigate = useNavigate();
    let isLogin = Cookies.get("login");

    useEffect(() => {
        if (isLogin) {
            setIsAdmin(Cookies.get("login"));
        }
    }, []);

    const handleGeneratePassword = () => {
        if (
            !includeUpperCase &&
            !includeLowerCase &&
            !includeNumbers &&
            !includeSymbols
        ) {
            notify(
                "To generate password you must select atleast one checkbox",
                true
            );
        } else {
            let characterList = "";
            if (includeNumbers) {
                characterList = characterList + numbers;
            }
            if (includeUpperCase) {
                characterList = characterList + upperCaseLetters;
            }
            if (includeLowerCase) {
                characterList = characterList + lowerCaseLetters;
            }
            if (includeSymbols) {
                characterList = characterList + specialCharacters;
            }
            setPassword(createPassword(characterList));
        }
    };

    const createPassword = (characterList) => {
        let password = "";
        const characterListLength = characterList.length;
        for (let i = 0; i < passwordLength; i++) {
            const characterIndex = Math.round(
                Math.random() * characterListLength
            );
            password = password + characterList.charAt(characterIndex);
        }

        if (password === "") {
            notify("Can not copy password to clipboard!", true);
        } else {
            copyToClipboard(password);
            notify("Password is generated and copied to clipboard");
        }
        return password;
    };

    
    const notify = (message, hasError = false) => {
        if (hasError) {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };


    const handleCopyPassword = (e) => {
        if (password === "") {
            notify("Can not copy password to clipboard!", true);
        } else {
            copyToClipboard(password);
            notify("Password successfully copied to clipboard");
        }
    };

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
    };

    const handleBack = (e) => {
        navigate(-1);
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
                            <a className="active" href="/register">
                                Register
                            </a>
                        </li>
                    )}
                </ul>
            </div>

            <div className="App">
                <div className="container">
                    <div className="generator">
                        <h2 className="generator__header">
                            Password Generator
                        </h2>
                        <div className="generator__password">
                            <h3>{password}</h3>
                            <button className="copy__btn">
                                <i
                                    onClick={handleCopyPassword}
                                    className="far fa-clipboard"
                                ></i>
                            </button>
                        </div>

                        <div className="form-groupp">
                            <label htmlFor="password-strength">
                                Password length
                            </label>
                            <input
                                className="pw"
                                defaultValue={passwordLength}
                                onChange={(e) =>
                                    setPasswordLength(e.target.value)
                                }
                                type="number"
                                id="password-stregth"
                                name="password-strength"
                                max="26"
                                min="8"
                                // value="12"
                            />
                        </div>

                        <div className="form-groupp">
                            <label htmlFor="uppercase-letters">
                                Add Uppercase Letters
                            </label>
                            <input
                                checked={includeUpperCase}
                                onChange={(e) =>
                                    setIncludeUpperCase(e.target.checked)
                                }
                                type="checkbox"
                                id="uppercase-letters"
                                name="uppercase-letters"
                            />
                        </div>

                        <div className="form-groupp">
                            <label htmlFor="lowercase-letters">
                                Add Lowercase Letters
                            </label>
                            <input
                                checked={includeLowerCase}
                                onChange={(e) =>
                                    setIncludeLowerCase(e.target.checked)
                                }
                                type="checkbox"
                                id="lowercase-letters"
                                name="lowercase-letters"
                            />
                        </div>

                        <div className="form-groupp">
                            <label htmlFor="include-numbers">
                                Include Numbers
                            </label>
                            <input
                                checked={includeNumbers}
                                onChange={(e) =>
                                    setIncludeNumbers(e.target.checked)
                                }
                                type="checkbox"
                                id="include-numbers"
                                name="include-numbers"
                            />
                        </div>

                        <div className="form-groupp">
                            <label htmlFor="include-symbols">
                                Include Symbols
                            </label>
                            <input
                                checked={includeSymbols}
                                onChange={(e) =>
                                    setIncludeSymbols(e.target.checked)
                                }
                                type="checkbox"
                                id="include-symbols"
                                name="include-symbols"
                            />
                        </div>

                        <button
                            onClick={handleGeneratePassword}
                            className="generator__btn"
                        >
                            Generate Password
                        </button>

                        <button onClick={handleBack} className="return__btn">
                            Register Account
                        </button>

                        <ToastContainer position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PassgenPage;
