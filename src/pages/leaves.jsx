import React from "react";

import { DashboardLayout } from "../components/Layout";
import Calendar from "../components/Calendar";

const LeavesPage = () => {
    return (
        <DashboardLayout>
            <Calendar />
            {/* <div id="scheduler_here" className="dhx_cal_container">
                <div className="dhx_cal_navline">
                    <div className="dhx_cal_prev_button">&nbsp;</div>
                    <div className="dhx_cal_next_button">&nbsp;</div>
                    <div className="dhx_cal_today_button"></div>
                    <div className="dhx_cal_date"></div>
                    <div className="dhx_cal_tab" name="day_tab"></div>
                    <div className="dhx_cal_tab" name="week_tab"></div>
                    <div className="dhx_cal_tab" name="month_tab"></div>
                </div>
                <div className="dhx_cal_header"></div>
                <div className="dhx_cal_data"></div>
            </div> */}
        </DashboardLayout>
    );
};

export default LeavesPage;
