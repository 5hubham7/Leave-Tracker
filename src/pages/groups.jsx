import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { DashboardLayout } from "../components/Layout";

const GroupsPage = () => {
    const history = useHistory();

    const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (token === null) {
            history.push({
                pathname: "/login",
            });
        }
    };

    useEffect(() => {
        checkLogin();
    });
    return (
        <DashboardLayout>
            <div className="row d-flex justify-content-center text-white px-4 pb-4">
                <div className="col-lg-4 p-3">
                    <select
                        id="groupSelect"
                        className="form-select "
                        placeholder="select a group"
                    >
                        <option value="">a</option>
                        <option value="">b</option>
                        <option value="">c</option>
                        <option value="">d</option>
                        <option value="">e</option>
                    </select>
                </div>
                <div className="col-lg-4 p-3">
                    <select
                        id="employeeSelect"
                        className="form-select "
                        placeholder="select employee"
                    >
                        <option value="">a</option>
                        <option value="">b</option>
                        <option value="">c</option>
                        <option value="">d</option>
                        <option value="">e</option>
                    </select>
                </div>
            </div>
            <div className="row d-flex justify-content-center text-white px-4 pb-4">
                <div className="col-lg-6 px-2 pt-2">
                    <table className="table table-hover bg-light text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Shubham Yadav</td>
                                <td>India</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default GroupsPage;
