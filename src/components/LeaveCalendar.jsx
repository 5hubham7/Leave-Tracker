import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

import { Tooltip } from "bootstrap";
import { getRequest } from "../helpers/ApiHelper";

export default function LeaveCalendar() {
    const [leaveEvents, setLeaveEvents] = useState([]);

    const getLeaveEvents = () => {
        getRequest(
            "http://localhost:3000/leaves/",
            localStorage.getItem("token")
        ).then((response) => {
            setLeaveEvents(response.response);
        });
    };

    const leaveClickHandler = (args) => {
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
        getLeaveEvents();
    }, []);

    return (
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
            events={leaveEvents}
            eventClick={leaveClickHandler}
            fixedWeekCount={false}
            height="90vh"
        />
    );
}
