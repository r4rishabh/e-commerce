import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar } from 'antd';
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";
import "../../dashboard.css";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            child: props.nestedRoute,
            search: "",
        };
    }

    componentDidMount() {
        this.activeNav();
    }

    activeNav() {
        const pathname = window.location.pathname;
        const possibleRoutes = [
            { routes: "/dashboard", targetId: "home" },
            { routes: "/addProduct", targetId: "addProduct" },
            { routes: "/products", targetId: "products" },
            { routes: "/profile", targetId: "profile" },
        ];

        possibleRoutes.forEach(({ route, targetId }) => {
            window.jQuery(`#${targetId}`).removeClass("active");
            if (route === pathname) {
                window.jQuery(`#${targetId}`).addClass("active");
            }

        });
    }

    avatarText = (name) => {
        let initial = "";
        const names = name.split(" ");
        names.forEach((name) => {
            initial = initial + name.charAt(0);
        })
        return initial;
    }

    logUserOut = (e) => {
        //e.preventDefault();
        this.props.logout();
    }


    render() {
        const Child = this.state.child;
        const { user } = this.props.auth;
        return (
            <div>
                <div id="wrapper">
                    <ul
                        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                        id="accordionSidebar"
                    >
                        <Link
                            className="sidebar-brand d-flex align-items-center justify-content-center"
                            to="/"
                        >
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-store"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">e-Shop</div>
                        </Link>

                        <hr className="sidebar-divider my-0" />

                        <li className="nav-item active">
                            <Link className="nav-link" to="/dashboard">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Merchant Store</span>
                            </Link>
                        </li>

                        <hr className="sidebar-divider" />

                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/addProduct">
                                <i className="fas fa-fw fa-chart-area"></i>
                                <span>Add A Product</span>
                            </Link>
                        </li>
                        <hr className="sidebar-divider " />
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/products">
                                <i className="fas fa-fw fa-table"></i>
                                <span>Products</span>
                            </Link>
                        </li>
                        <hr className="sidebar-divider" />
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/profile">
                                <i className="fa-solid fa-user"></i>
                                <span>Profile</span>
                            </Link>
                        </li>
                        <hr className="sidebar-divider " />
                    </ul>

                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                <button
                                    id="sidebarToggleTop"
                                    className="btn btn-link d-md-none rounded-circle mr-3"
                                >
                                    <i className="fa fa-bars"></i>
                                </button>

                                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 small"
                                            placeholder="Search for..."
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to="#"
                                            id="searchDropdown"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="fas fa-search fa-fw"></i>
                                        </Link>

                                        <div
                                            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                            aria-labelledby="searchDropdown"
                                        >
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control bg-light border-0 small"
                                                        placeholder="Search for..."
                                                        aria-label="Search"
                                                        aria-describedby="basic-addon2"
                                                    />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <i className="fas fa-search fa-sm"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>

                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    <div className="dropdown">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user.name}
                                        </span>
                                        <Avatar size={40}>
                                            {user.name && this.avatarText(user.name)}
                                        </Avatar>
                                        <ul className="dropdown-menu  ml-auto" aria-labelledby="dropdownMenuButton1">
                                            <Link className="dropdown-item" to="#">
                                                <i className="fa-solid fa-user"></i>
                                                Profile
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                            <Link
                                                className="dropdown-item"
                                                to="/login"
                                                replace
                                                onClick={this.logUserOut}
                                            >
                                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                Logout
                                            </Link>
                                        </ul>
                                    </div>
                                </ul>
                            </nav>
                            <Child {...this.props} search={this.state.search} />
                        </div>

                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; eShop {new Date().getFullYear()}</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>

                <Link className="scroll-to-top rounded" to="#page-top">
                    <i className="fas fa-angle-up"></i>
                </Link>

                <div
                    className="modal fade"
                    id="logoutModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Ready to Leave?
                                </h5>
                                <button
                                    className="close"
                                    type="button"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Select "Logout" below if you are ready to end your current
                                session.
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    data-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <Link className="btn btn-primary" to="login.html">
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    };

}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,

}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Dashboard);