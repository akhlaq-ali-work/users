import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Dashboard/Home";
import Users from "../pages/Dashboard/Users";
import Logs from "../pages/Dashboard/Logs";
import Layout from "../components/layout/Layout";
import { useAppSelector } from "../hooks/useAppSelector";
import PageNotFound from "@/pages/PageNotFound";

const RouterConfig = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
      >
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="logs" element={<Logs />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RouterConfig;
