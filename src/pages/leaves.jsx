import React, { useEffect } from "react";

import { DashboardLayout } from "../components/Layout";
import Calendar from "../components/Calendar";
import { useHistory } from "react-router-dom";

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
            <div className="row p-4 pt-2">
                <Calendar />
            </div>
        </DashboardLayout>
    );
};

export default LeavesPage;
