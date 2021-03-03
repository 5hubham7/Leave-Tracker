import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import postRequest, { getRequest } from "../helpers/ApiHelper";

const LoginPage = () => {
    let history = useHistory();

    const [managerData, setManager] = useState({
        email: "",
        password: "",
        manager_name: "",
        manager_phone: "",
        manager_email: "",
        manager_password: "",
        token: "",
    });

    const onInputChange = (e) => {
        setManager({ ...managerData, [e.target.id]: e.target.value });
    };

    const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            history.push({
                pathname: "/dashboard",
            });
        } else {
            history.push({
                pathname: "/login",
            });
        }
    };

    const goToLogin = () => {
        document.getElementById("signupPage").setAttribute("hidden", true);
        document.getElementById("loginPage").removeAttribute("hidden");
    };

    const goToSignup = () => {
        document.getElementById("loginPage").setAttribute("hidden", true);
        document.getElementById("signupPage").removeAttribute("hidden");
    };

    const signup = async () => {
        let signupButton = document.getElementById("signupButton");
        let signupMessage = document.getElementById("signupMessage");
        signupButton.setAttribute("disabled", true);
        let data = {
            manager_name: managerData.manager_name,
            manager_phone: managerData.manager_phone,
            manager_email: managerData.manager_email,
            manager_password: managerData.manager_password,
        };

        await getRequest("http://localhost:3000/managers/register", data)
            .then(async (response) => {
                console.log(response);

                if (response.status === 200) {
                    signupMessage.innerHTML = `<div className="alert alert-success text-center">"Signed up successfully!"</div>`;

                    setTimeout(() => {
                        goToLogin();
                    }, 2000);
                } else {
                    signupMessage.innerHTML = `<div className="alert alert-danger text-center">${response.error}!</div>`;
                }
                signupMessage.removeAttribute("disabled");
            })
            .catch(() => {
                signupMessage.removeAttribute("disabled");
                signupMessage.innerHTML = `<div className="alert alert-danger text-center">"Something went wrong!"</div>`;
            });
    };

    const login = () => {
        let loginButton = document.getElementById("loginButton");
        let loginMessage = document.getElementById("loginMessage");
        loginButton.setAttribute("disabled", true);

        let body = {
            manager_email: managerData.email,
            manager_password: managerData.password,
        };
        console.log(body);

        postRequest("http://localhost:3000/managers/authenticate", body)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    response = response.response;
                    loginMessage.innerHTML = `<div className="alert alert-success text-center">Logged in successfully!</div>`;

                    setTimeout(() => {
                        localStorage.setItem("manager_id", response.manager_id);
                        setManager({
                            manager_id: response.manager_id,
                        });

                        localStorage.setItem(
                            "manager_name",
                            response.manager_name
                        );
                        setManager({
                            manager_name: response.manager_name,
                        });
                        localStorage.setItem("token", response.token);
                        setManager({
                            token: response.token,
                        });
                        history.push({
                            pathname: "/dashboard",
                            state: { managerData: managerData },
                        });
                    }, 3000);
                } else {
                    loginMessage.innerHTML = `<div className="alert alert-danger text-center">${response.error}</div>`;
                }
                loginButton.removeAttribute("disabled");
            })
            .catch(() => {
                loginButton.removeAttribute("disabled");
                loginMessage.innerHTML = `<div className="alert alert-danger text-center">Something went wrong!</div>`;
            });
    };

    useEffect(() => {
        checkLogin();
    });

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center bg-dark p-3">
                <h1
                    className="h1 fw-bold text-white text-uppercase animated spacing"
                    onClick={() => {
                        history.push("/home");
                    }}
                >
                    Leave Tracker
                </h1>
            </div>
            <div className="d-flex justify-content-center align-items-center login bg py-2">
                <div id="loginPage">
                    <div className="form-row card bg-dark bg-gradient border-success shadow-lg">
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
                                placeholder="Email"
                                required
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                            />
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="password"
                                id="password"
                                className="form-control rounded-pill px-4 py-2 fw-bold"
                                placeholder="Password"
                                required
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                            />
                        </div>
                        <div className="col px-5 pb-4 d-grid animated fadeIn">
                            <button
                                id="loginButton"
                                type="submit"
                                className="btn btn-success rounded-pill px-4 py-2 fw-bold text-uppercase animated spacing"
                                onClick={() => {
                                    login();
                                }}
                            >
                                log in
                            </button>
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <div id="loginMessage"></div>
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
                <div id="signupPage" hidden>
                    <div className="form-row card bg-dark bg-gradient border-primary shadow-lg">
                        <div className="col p-5 pb-4">
                            <h2 className="h2 text-white text-center fw-bold text-uppercase animated spacing">
                                signup
                            </h2>
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="text"
                                id="manager_name"
                                className="form-control rounded-pill border-primary px-4 py-2 fw-bold"
                                placeholder="Full name"
                                required
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                            />
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="tel"
                                id="manager_phone"
                                className="form-control rounded-pill border-primary px-4 py-2 fw-bold"
                                placeholder="Phone number"
                                required
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                            />
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="text"
                                id="manager_email"
                                className="form-control rounded-pill border-primary px-4 py-2 fw-bold"
                                placeholder="Email"
                                required
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                            />
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <input
                                type="password"
                                id="manager_password"
                                className="form-control rounded-pill px-4 py-2 fw-bold"
                                placeholder="Password"
                                required
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                            />
                        </div>
                        <div className="col px-5 pb-4 d-grid animated fadeIn">
                            <button
                                id="signupButton"
                                className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-uppercase animated spacing"
                                onClick={() => {
                                    signup();
                                }}
                            >
                                sign up
                            </button>
                        </div>
                        <div className="col px-5 pb-4 animated fadeIn">
                            <div id="signupMessage"></div>
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
        </div>
    );
};

export default LoginPage;
