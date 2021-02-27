import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Logo } from "../components/Logo";

const LoginPage = () => {
    let history = useHistory();

    const [manager, setManager] = useState({
        manager_email: "",
        manager_password: "",
    });

    const onInputChange = (e) => {
        setManager({ ...manager, [e.target.id]: e.target.value });
    };

    const checkLogin = () => {
        const token = localStorage.getItem("token");
        const manager_name = localStorage.getItem("manager_name");
        if (token != null) {
            history.push({
                pathname: "/Dashboard",
                state: { detail: manager_name },
            });
        }
    };

    const login2 = async (e) => {
        e.preventDefault();

        await axios({
            method: "post",
            url: "http://localhost:5000/managers/authenticate",
            data: manager,
        }).then((response) => {
            var result = response.data;
            if (result.status === 200) {
                localStorage.setItem("token", result.response.token);
                localStorage.setItem(
                    "manager_name",
                    result.response.manager_name
                );
                localStorage.setItem("id", result.response.manager_id);
                document.getElementById("message").innerHTML =
                    '<p class="text-success" style="text-align:center">LOGIN SUCESSFULLY</p>';
                setTimeout(() => {
                    history.push({
                        pathname: "/dashboard",
                        state: { detail: result.response.manager_name },
                    });
                }, 3000);
            } else {
                document.getElementById("message").innerHTML =
                    '<p class="text-danger" style="text-align:center">FAILED TO LOGIN ! PLEASE TRY AGAIN</p>';
            }
        });
    };

    const register = async (e) => {
        var manager_name = document.getElementById("manager_name").value;
        var manager_password = document.getElementById("manager_password")
            .value;
        var manager_phone = document.getElementById("manager_phone").value;
        var manager_email = document.getElementById("manager_email").value;
        const data = {
            manager_name: manager_name,
            manager_password: manager_password,
            manager_phone: manager_phone,
            manager_email: manager_email,
        };
        //console.log(data)
        e.preventDefault();
        await axios({
            method: "post",
            url: "http://localhost:5000/managers/register",
            data: data,
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                document.getElementById("message1").innerHTML =
                    '<p class="text-success" style="text-align:center">Signup Sucessfully ! You Can Login now..</p>';
            } else {
                document.getElementById("message1").innerHTML =
                    '<p class="text-danger" style="text-align:center">' +
                    response.error +
                    "</p>";
            }
        });
    };

    useEffect(() => {
        // checkLogin();
    });

    const goToLogin = () => {
        let signupPage = document.getElementById("signupPage");
        signupPage.setAttribute("hidden", true);
        let loginPage = document.getElementById("loginPage");
        loginPage.removeAttribute("hidden");
    };
    const goToSignup = () => {
        let loginPage = document.getElementById("loginPage");
        loginPage.setAttribute("hidden", true);
        let signupPage = document.getElementById("signupPage");
        signupPage.removeAttribute("hidden");
    };
    const signup = () => {};
    const login = () => {};

    return (
        <div className="container">
            <Logo />
            <div className="d-flex justify-content-center align-items-center bg-secondary login py-2">
                <div id="loginPage" hidden>
                    <div className="form-row card bg-dark bg-gradient shadow-lg">
                        <div className="col p-5 pb-4">
                            <h2 className="h2 text-white text-center fw-bold text-uppercase animated spacing">
                                login
                            </h2>
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="text"
                                id="email"
                                className="form-control rounded-pill px-4 py-2 fw-bold"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="password"
                                id="password"
                                className="form-control rounded-pill px-4 py-2 fw-bold"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="col px-5 pb-4 d-grid animated fadeIn">
                            <button
                                className="btn btn-success rounded-pill px-4 py-2 fw-bold text-uppercase animated spacing"
                                onClick={() => {
                                    login();
                                }}
                            >
                                log in
                            </button>
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <div className="border-top border-2 px-2 animated fadeIn"></div>
                        </div>
                        <div className="col px-5 pb-5 d-grid animated fadeIn">
                            <button
                                className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-uppercase  animated spacing"
                                onClick={() => {
                                    goToSignup();
                                }}
                            >
                                sign up
                            </button>
                        </div>
                    </div>
                </div>
                <div id="signupPage">
                    <div className="form-row card bg-dark bg-gradient shadow-lg">
                        <div className="col p-5 pb-4">
                            <h2 className="h2 text-white text-center fw-bold text-uppercase animated spacing">
                                signup
                            </h2>
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="text"
                                id="manager_name"
                                className="form-control rounded-pill px-4 py-2 fw-bold"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="tel"
                                id="manager_phone"
                                className="form-control rounded-pill px-4 py-2 fw-bold"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="text"
                                id="manager_email"
                                className="form-control  rounded-pill px-4 py-2 fw-bold"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="password"
                                id="manager_password"
                                className="form-control rounded-pill px-4 py-2 fw-bold"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="col px-5 pb-4 d-grid animated fadeIn">
                            <button
                                className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-uppercase animated spacing"
                                onClick={() => {
                                    signup();
                                }}
                            >
                                sign up
                            </button>
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <div className="border-top border-2 px-2"></div>
                        </div>
                        <div className="col px-5 pb-5 d-grid animated fadeIn">
                            <button
                                className="btn btn-success rounded-pill px-4 py-2 fw-bold text-uppercase animated spacing"
                                onClick={() => {
                                    goToLogin();
                                }}
                            >
                                log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="col-md-6 mx-auto p-0">
                <div className="card" style={{ border: "none" }}>
                    <div className="login-box">
                        <div className="login-snip">
                            <input
                                id="tab-1"
                                type="radio"
                                className="sign-in"
                                checked
                            />
                            <label htmlFor="tab-1" className="tab">
                                Login
                            </label>
                            <input
                                id="tab-2"
                                type="radio"
                                className="sign-up"
                            />
                            <label htmlFor="tab-2" className="tab">
                                Sign Up
                            </label>

                            <div className="login-space">
                                <div className="login">
                                    <form onSubmit={(e) => login(e)}>
                                        <div className="group">
                                            <label
                                                htmlFor="manager_email"
                                                className="label"
                                            >
                                                Enter your email
                                            </label>
                                            <input
                                                id="manager_email"
                                                type="email"
                                                className="input"
                                                placeholder="Enter your Email"
                                                onChange={(e) =>
                                                    onInputChange(e)
                                                }
                                            />
                                        </div>
                                        <div className="group">
                                            <label
                                                htmlFor="manager_password"
                                                className="label"
                                            >
                                                Enter your password
                                            </label>
                                            <input
                                                id="manager_password"
                                                type="password"
                                                className="input"
                                                data-type="password"
                                                placeholder="Enter your password"
                                                onChange={(e) =>
                                                    onInputChange(e)
                                                }
                                            />
                                        </div>
                                        <div className="group">
                                            <input
                                                id="check"
                                                type="checkbox"
                                                className="check"
                                                defaultChecked={true}
                                            />
                                            <label htmlFor="check">
                                                <span className="icon"></span>
                                                Keep me Signed in
                                            </label>
                                        </div>
                                        <div className="group">
                                            <input
                                                type="submit"
                                                className="button"
                                                value="Sign In"
                                            />
                                        </div>
                                        <div id="message"></div>
                                        <div className="hr"></div>
                                    </form>
                                </div>
                                <div className="sign-up-form">
                                    <div className="group">
                                        <label htmlFor="user" className="label">
                                            Full Name
                                        </label>
                                        <input
                                            id="manager_name"
                                            type="text"
                                            className="input"
                                            placeholder="Enter your full name "
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">
                                            Password
                                        </label>
                                        <input
                                            id="manager_password"
                                            type="password"
                                            className="input"
                                            data-type="password"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">
                                            Phone Number
                                        </label>
                                        <input
                                            id="manager_phone"
                                            type="text"
                                            className="input"
                                            placeholder="Enter your Phone Number"
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">
                                            Email Address
                                        </label>
                                        <input
                                            id="manager_email"
                                            type="text"
                                            className="input email"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                    <div className="group">
                                        <input
                                            type="submit"
                                            className="button"
                                            value="Sign Up"
                                            onClick={(e) => register(e)}
                                        />
                                    </div>
                                    <div id="message1"></div>
                                    <div className="hr"></div>
                                    <div className="foot">
                                        <label htmlFor="tab-1">
                                            Already Member?
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>*/}
        </div>
    );
};

export default LoginPage;
