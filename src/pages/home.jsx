import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { DashboardLayout } from "../components/Layout";

const HomePage = () => {
    const history = useHistory();

    const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (token === null) {
            history.push({
                pathname: "/login",
            });
        }
    };

    useEffect(() => {
        checkLogin();
    });
    return <DashboardLayout></DashboardLayout>;
};

export default HomePage;
