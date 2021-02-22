import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faChartPie,
    faCogs,
    faExclamationTriangle,
    faHome,
    faInfoCircle,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
    const history = useHistory();
    const location = useLocation();

    return (
        <React.Fragment>
            <div className="shadow-lg">
                <Navigation
                    activeItemId={location.pathname}
                    onSelect={({ itemId }) => {
                        history.push(itemId);
                    }}
                    items={[
                        {
                            title: "Dashboard",
                            itemId: "/dashboard",
                            elemBefore: () => <FontAwesomeIcon icon={faHome} />,
                        },
                        {
                            title: "Leaves",
                            itemId: "/leaves",
                            elemBefore: () => (
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            ),
                        },
                        {
                            title: "Risks",
                            itemId: "/risks",
                            elemBefore: () => (
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                            ),
                        },
                        {
                            title: "Groups",
                            itemId: "/groups",
                            elemBefore: () => (
                                <FontAwesomeIcon icon={faUsers} />
                            ),
                        },
                        {
                            title: "Charts",
                            itemId: "/charts",
                            elemBefore: () => (
                                <FontAwesomeIcon icon={faChartPie} />
                            ),
                        },
                        {
                            title: "About",
                            itemId: "/about",
                            elemBefore: () => (
                                <FontAwesomeIcon icon={faInfoCircle} />
                            ),
                        },
                    ]}
                />
                <Navigation
                    activeItemId={location.pathname}
                    items={[
                        {
                            title: "Settings",
                            itemId: "/settings",
                            elemBefore: () => <FontAwesomeIcon icon={faCogs} />,
                        },
                    ]}
                    onSelect={({ itemId }) => {
                        history.push(itemId);
                    }}
                />
            </div>
        </React.Fragment>
    );
};
