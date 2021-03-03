import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

import $ from "jquery";
import { Tooltip } from "bootstrap";
import { getRequest } from "../helpers/ApiHelper";
import { useHistory } from "react-router-dom";

export default function RiskCalendar() {
    const [riskEvents, setRiskEvents] = useState([]);

    const history = useHistory();

    const getRiskEvents = () => {
        getRequest(
            "http://localhost:3000/risks/",
            localStorage.getItem("token")
        ).then((response) => {
            setRiskEvents(response.response);
        });
    };

    const riskClickHandler = (args) => {
        localStorage.setItem("currentGroup", args.event._def.title);
        $(".tooltip").hide();
        history.push({
            pathname: "/Leaves",
        });
    };

    const showTooltip = (arg) => {
        new Tooltip(arg.el, {
            title:
                arg.event._def.title +
                " : " +
                arg.event._def.extendedProps.description,
            trigger: "hover",
            placement: "top",
            delay: { show: 50, hide: 50 },
            animation: true,
            container: "body",
            template: `
            <div class="tooltip" role="tooltip">
                <div class="arrow text-warning"></div>
                <div class="tooltip-inner p-2 bg-dark bg-gradient text-white rounded-pill fw-bold"></div>
            </div>`,
        });
    };

    useEffect(() => {
        getRiskEvents();
    }, []);

    return (
        <div>
            <FullCalendar
                viewClassNames="text-uppercase fw-bold"
                moreLinkClassNames="bg-primary"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "today",
                }}
                plugins={[dayGridPlugin, interactionPlugin]}
                eventDidMount={showTooltip}
                selectMirror={true}
                dayMaxEvents={3}
                weekends={true}
                events={riskEvents}
                eventClick={riskClickHandler}
                fixedWeekCount={false}
                height="90vh"
            />
        </div>
    );
}
