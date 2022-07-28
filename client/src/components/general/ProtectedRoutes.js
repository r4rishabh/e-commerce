import React from 'react';
import { connect } from "react-redux"
// import { Navigate } from "react-router-dom";


// const ProtectedRoutes = ({ children }) => {
//     if (localStorage.getItem("token")) {
//         return children;
//     }
//     return <Navigate replace to={`/login${window.location.search}`} />;
// }
// export default ProtectedRoutes;

import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = (...rest) => {
    return (
        localStorage.getItem("token") ? <Outlet /> : <Navigate {...rest} to={`/login${window.location.search}`} replace />
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedRoutes);

