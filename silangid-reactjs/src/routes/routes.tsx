import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
};
