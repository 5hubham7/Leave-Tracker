import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./home";
import DashboardPage from "./dashboard";
import LeavesPage from "./leaves";
import RisksPage from "./risks";
import GroupsPage from "./groups";
import ChartsPage from "./charts";
import AboutPage from "./about";
import SettingsPage from "./settings";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard">
                    <DashboardPage />
                </Route>
                <Route path="/leaves">
                    <LeavesPage />
                </Route>
                <Route path="/risks">
                    <RisksPage />
                </Route>
                <Route path="/groups">
                    <GroupsPage />
                </Route>
                <Route path="/charts">
                    <ChartsPage />
                </Route>
                <Route path="/about">
                    <AboutPage />
                </Route>
                <Route path="/settings">
                    <SettingsPage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
