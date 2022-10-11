import React, { Fragment } from "react";

const SideNav = () => {
  return (
    <Fragment>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">Main</li>
              <li className="active">
                <a href="index-2.html">
                  <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="doctors.html">
                  <i className="fa fa-user-md"></i> <span>Doctors</span>
                </a>
              </li>
              <li>
                <a href="patients.html">
                  <i className="fa fa-wheelchair"></i> <span>Patients</span>
                </a>
              </li>
              {/* <li>
                <a href="appointments.html">
                  <i className="fa fa-calendar"></i> <span>Appointments</span>
                </a>
              </li> */}
              {/* <li>
                <a href="schedule.html">
                  <i className="fa fa-calendar-check-o"></i>{" "}
                  <span>Doctor Schedule</span>
                </a>
              </li> */}
              {/* <li>
                <a href="departments.html">
                  <i className="fa fa-hospital-o"></i> <span>Departments</span>
                </a>
              </li> */}
              {/* <li className="submenu">
                <a href="#">
                  <i className="fa fa-user"></i> <span> Employees </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="employees.html">Employees List</a>
                  </li>
                  <li>
                    <a href="leaves.html">Leaves</a>
                  </li>
                  <li>
                    <a href="holidays.html">Holidays</a>
                  </li>
                  <li>
                    <a href="attendance.html">Attendance</a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="submenu">
                <a href="#">
                  <i className="fa fa-money"></i> <span> Accounts </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="invoices.html">Invoices</a>
                  </li>
                  <li>
                    <a href="payments.html">Payments</a>
                  </li>
                  <li>
                    <a href="expenses.html">Expenses</a>
                  </li>
                  <li>
                    <a href="taxes.html">Taxes</a>
                  </li>
                  <li>
                    <a href="provident-fund.html">Provident Fund</a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="submenu">
                <a href="#">
                  <i className="fa fa-book"></i> <span> Payroll </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="salary.html"> Employee Salary </a>
                  </li>
                  <li>
                    <a href="salary-view.html"> Payslip </a>
                  </li>
                </ul>
              </li> */}
              {/* <li>
                <a href="assets.html">
                  <i className="fa fa-cube"></i> <span>Assets</span>
                </a>
              </li> */}
              <li className="submenu">
                <a href="#">
                  <i className="fa fa-flag-o"></i> <span> Reports </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="expense-reports.html"> Expense Report </a>
                  </li>
                  <li>
                    <a href="invoice-reports.html"> Invoice Report </a>
                  </li>
                </ul>
              </li>
              {/* <li>
                <a href="settings.html">
                  <i className="fa fa-cog"></i> <span>Settings</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SideNav;
