import {  Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user, redirectPath = 'login/', children, ...rest }) => {
    if (!user) {
        return <Navigate to={redirectPath} replace />;
      }
    
      return <Outlet/>;
};

export default ProtectedRoute;
