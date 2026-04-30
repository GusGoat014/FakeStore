import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}