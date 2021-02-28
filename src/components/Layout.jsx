import React from "react";

import BodyWrapper from "./BodyWrapper";
import { Logo } from "./Logo";
import { Navbar } from "./NavBar";

export const DashboardLayout = ({ children }) => {
    return (
        <BodyWrapper>
            <div className="container">
                <Logo />
                <Navbar />
                <div className="bg">{children}</div>
            </div>
        </BodyWrapper>
    );
};
