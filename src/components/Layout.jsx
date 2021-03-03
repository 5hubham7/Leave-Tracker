import React from "react";

import BodyWrapper from "./BodyWrapper";
import { Navbar } from "./NavBar";

export const DashboardLayout = ({ children }) => {
    return (
        <BodyWrapper>
            <div className="container">
                <Navbar />
                <div className="bg animated fadeIn">{children}</div>
            </div>
        </BodyWrapper>
    );
};
