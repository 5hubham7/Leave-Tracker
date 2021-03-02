import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LeaveCalendar from "../components/LeaveCalendar";

import { DashboardLayout } from "../components/Layout";

const LeavesPage = () => {
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
            <LeaveCalendar />
        </DashboardLayout>
    );
};

export default LeavesPage;
