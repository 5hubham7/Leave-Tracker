import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import RiskCalendar from "../components/RiskCalendar";

import { DashboardLayout } from "../components/Layout";

const RisksPage = () => {
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
    return (
        <DashboardLayout>
            <RiskCalendar />
        </DashboardLayout>
    );
};

export default RisksPage;
