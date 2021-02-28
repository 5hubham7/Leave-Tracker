import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { Tooltip } from "bootstrap";

export default function Calendar() {
    const calendarComponentRef = React.createRef();

    var state = {
        calendarWeekends: true,
        calendarEvents: [
            {
                title: "Boring Week",
                start: "2021-02-07",
                end: "2021-02-15",
            },
            {
                title: "Shubham on leave",
                start: "2021-02-25",
            },
            {
                title: "Shubham on leave",
                start: "2021-02-01",
                end: "2021-02-03",
            },
            {
                title: "Shubham on leave",
                start: "2021-02-20",
                description: "Without any reason :D",
            },
            {
                title: "Shubham on leave",
                start: "2021-02-28",
                description: "ok",
                borderColor: "red",
                classNames: "",
            },
        ],
    };

    const showTooltip = (arg) => {
        new Tooltip(arg.el, {
            title:
                arg.event._def.title +
                " : " +
                arg.event._def.extendedProps.description,
            placement: "top",
            trigger: "hover",
            delay: { show: 100, hide: 100 },
            animation: true,
            container: "body",
            customClass: "bg-danger ",
        });
    };

    return (
        <div className="bg shadow-lg font-weight-bold">
            <div className="text-uppercase ">
                <FullCalendar
                    defaultView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "today",
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    ref={calendarComponentRef}
                    weekends={state.calendarWeekends}
                    events={state.calendarEvents}
                    eventDidMount={showTooltip}
                    height="72vh"
                />
            </div>
        </div>
    );
}
