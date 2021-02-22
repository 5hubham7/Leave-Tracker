import React from "react";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
    const history = useHistory();
    return (
        <div className="text-center mt-3 mb-5 p-1 bg-dark shadow-lg d-flex justify-content-center">
            <h2
                className="h2 fw-bold text-white text-uppercase"
                onClick={() => {
                    history.push("/home");
                }}
            >
                Leave Tracker
            </h2>
        </div>
    );
};
