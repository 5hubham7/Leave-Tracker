import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

import { Tooltip } from "bootstrap";
import { getRequest } from "../helpers/ApiHelper";

export default function RiskCalendar() {
    const [riskEvents, setRiskEvents] = useState([]);

    const getRiskEvents = () => {
        getRequest(
            "http://localhost:3000/risks/",
            localStorage.getItem("token")
        ).then((response) => {
            setRiskEvents(response.response);
        });
    };

    const riskClickHandler = (args) => {
        console.log(args.event._def.title);
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
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 p-3">
                    <select
                        id="groupSelect"
                        className="form-select"
                        placeholder="select a group"
                    >
                        <option value="">a</option>
                        <option value="">b</option>
                        <option value="">c</option>
                        <option value="">d</option>
                        <option value="">e</option>
                    </select>
                </div>
            </div>
            <FullCalendar
                defaultView="dayGridMonth"
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
                dayMaxEvents={2}
                weekends={true}
                events={riskEvents}
                eventClick={riskClickHandler}
                fixedWeekCount={false}
                height="80vh"
            />
        </div>
    );
}
