import React from "react";
import { useHistory } from "react-router-dom";

export const Logo = () => {
    const history = useHistory();

    return (
        <div className="text-center p-2 mt-2 bg-dark justify-content-center">
            <h2
                className="h2 fw-bold text-white text-uppercase animated spacing"
                onClick={() => {
                    history.push("/home");
                }}
            >
                Leave Tracker
            </h2>
        </div>
    );
};
