import React from "react";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
    const history = useHistory();

    return (
        <div className="shadow-lg mt-3">
            <div className="text-center p-1 bg-dark justify-content-center">
                <h2
                    className="h2 fw-bold text-white text-uppercase"
                    onClick={() => {
                        history.push("/home");
                    }}
                >
                    Leave Tracker
                </h2>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler my-2"
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
                        className="collapse navbar-collapse justify-content-around"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav ">
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
                            <h5
                                className="nav-link text-danger"
                                id="logout"
                                onClick={() => {
                                    history.push("/settings");
                                }}
                            >
                                Logout
                            </h5>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
