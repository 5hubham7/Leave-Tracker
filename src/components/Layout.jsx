import React from "react";

import { NavSidebar } from "./NavSidebar";
import BodyWrapper from "./BodyWrapper";
import { Navbar } from "./NavBar";

export const DashboardLayout = ({ children }) => {
    return (
        <BodyWrapper>
            <Navbar />
            <div className="d-flex">
                <div className="">
                    <NavSidebar />
                </div>
                <div className="container mx-5">{children}</div>
            </div>
        </BodyWrapper>
    );
};
