import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { Tooltip } from "bootstrap";
import { getRequest } from "../helpers/ApiHelper";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

export default function LeaveCalendar() {
    const [leaveEvents, setLeaveEvents] = useState([]);

    const [groups, setGroups] = useState([]);

    const [currentGroup, setCurrentGroup] = useState(
        localStorage.getItem("currentGroup")
    );

    useEffect(() => {
        console.log(currentGroup);
        document.getElementById("groupSelect").value = currentGroup;
    });

    let groupList =
        groups.length > 0 &&
        groups.map((item, i) => {
            return (
                <option key={i} value={item.group_name}>
                    {item.group_name}
                </option>
            );
        }, this);

    const getAllGroupNames = () => {
        getRequest(
            "http://localhost:3000/groups/",
            localStorage.getItem("token")
        ).then((response) => {
            setGroups(response.response);
        });
    };

    const getLeaveEventsByGroupName = (group_name) => {
        getRequest(
            "http://localhost:3000/leaves/getbyname/" + group_name,
            localStorage.getItem("token")
        ).then((response) => {
            setLeaveEvents(response.response);
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

    const onGroupSelected = (e) => {
        setCurrentGroup(e.target.value);
        getLeaveEventsByGroupName(e.target.value);
    };

    useEffect(() => {
        getAllGroupNames();
        getLeaveEventsByGroupName(currentGroup);
    }, [currentGroup]);

    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 p-3">
                    <select
                        id="groupSelect"
                        className="form-select"
                        placeholder="select a group"
                        onChange={(e) => {
                            onGroupSelected(e);
                        }}
                    >
                        {groupList}
                    </select>
                </div>
            </div>
            <FullCalendar
                viewClassNames="text-uppercase fw-bold"
                moreLinkClassNames="bg-secondary text-white p-1"
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
                fixedWeekCount={false}
                height="80vh"
            />
        </div>
    );
}
