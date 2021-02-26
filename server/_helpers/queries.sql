DROP
    DATABASE ltdb;

CREATE DATABASE ltdb;

USE
    ltdb;

CREATE TABLE managers(
    manager_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    manager_name VARCHAR(100),
    manager_phone VARCHAR(10),
    manager_email VARCHAR(100),
    manager_password VARCHAR(100)
);

CREATE TABLE work_groups(
    groups_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    groups_name VARCHAR(100),
    threshold VARCHAR(10)
);

CREATE TABLE countries(
    country_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    country_name VARCHAR(100)
);

CREATE TABLE employees(
    employee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(100),
    employee_phone VARCHAR(10),
    employee_email VARCHAR(100),
    employee_password VARCHAR(100),
    group_id INT REFERENCES work_groups(group_id) ON DELETE CASCADE ON UPDATE CASCADE,
    manager_id INT REFERENCES managers(manager_id) ON DELETE CASCADE ON UPDATE CASCADE,
    country_id INT REFERENCES countries(country_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE public_holidays(
    public_holidays DATE,
    country_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE leaves(
    leave_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    start_date DATE,
    end_date DATE,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE risks(
    risk_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    start_date DATE,
    end_date DATE,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE ON UPDATE CASCADE,
    leave_id INT REFERENCES leaves(leave_id) ON DELETE CASCADE ON UPDATE CASCADE
);