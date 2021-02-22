import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default class Calendar extends React.Component {
    calendarComponentRef = React.createRef();

    state = {
        calendarWeekends: true,
        calendarEvents: [
            {
                title: "Boring Week",
                start: "2021-02-07",
                end: "2021-02-15",
                color: "green",
            },
            {
                title: "Shubham on leave",
                start: "2021-02-25",
                color: "red",
            },
        ],
    };

    render() {
        return (
            <div className="bg-light shadow-lg font-weight-bold">
                <div className="text-uppercase ">
                    <FullCalendar
                        defaultView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek",
                        }}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        ref={this.calendarComponentRef}
                        weekends={this.state.calendarWeekends}
                        events={this.state.calendarEvents}
                        dateClick={this.handleDateClick}
                        height="490px"
                    />
                </div>
            </div>
        );
    }

    handleDateClick = (arg) => {
        if (prompt("Would you like to add an event to " + arg.dateStr + " ?")) {
            this.setState({
                calendarEvents: this.state.calendarEvents.concat({
                    title: "New Event",
                    start: arg.date,
                    allDay: arg.allDay,
                }),
            });
        }
    };
}
