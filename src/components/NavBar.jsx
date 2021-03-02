import React from "react";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("token");
        if (localStorage.removeItem("token") == null) {
            setTimeout(() => {
                history.push("/login");
            }, 1000);
        }
    };

    return (
        <div className="shadow-lg bg-dark">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <h2
                        className="navbar-brand h2 fw-bold text-uppercase animated spacing"
                        onClick={() => {
                            history.push("/home");
                        }}
                    >
                        Leave Tracker
                    </h2>
                    <button
                        className="navbar-toggler my-2 mx-3 rounded-pill border"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav">
                            <h5
                                className="nav-link"
                                id="dashboard"
                                onClick={(e) => {
                                    history.push("/dashboard");
                                }}
                            >
                                Dashboard
                            </h5>
                            <h5
                                className="nav-link"
                                id="leaves"
                                onClick={() => {
                                    history.push("/leaves");
                                }}
                            >
                                Leaves
                            </h5>
                            <h5
                                className="nav-link"
                                id="risks"
                                onClick={() => {
                                    history.push("/risks");
                                }}
                            >
                                Risks
                            </h5>
                            <h5
                                className="nav-link"
                                id="groups"
                                onClick={() => {
                                    history.push("/groups");
                                }}
                            >
                                Groups
                            </h5>
                            <h5
                                className="nav-link"
                                id="charts"
                                onClick={() => {
                                    history.push("/charts");
                                }}
                            >
                                Charts
                            </h5>
                            <h5
                                className="nav-link"
                                id="about"
                                onClick={() => {
                                    history.push("/about");
                                }}
                            >
                                About
                            </h5>
                            <h5
                                className="nav-link"
                                id="settings"
                                onClick={() => {
                                    history.push("/settings");
                                }}
                            >
                                Settings
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <h5
                        className="btn btn-danger bg-gradient btn-sm px-2 py-2 rounded-pill text-uppercase fw-bold mx-1 mt-2"
                        id="logout"
                        onClick={() => {
                            logout();
                        }}
                    >
                        Logout
                    </h5>
                </div>
            </nav>
        </div>
    );
};
