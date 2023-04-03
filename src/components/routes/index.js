/*
-
- This is the Rotes file
- This will handle all the page rendering
-
*/

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Accounts from "../../screens/user-profile";
import Dashboard from "../../screens/dashboard";
import Footer from "../../containers/footer";
import Home from "../../screens/welcome-screen";
import Login from "../../screens/sign-in";
import Project from "../../screens/project";
import React from "react";
import ReviewUploads from "../../screens/review";
import Room from "../../screens/room";
import RoomTypes from '../../screens/room-types';
import Unit from "../../screens/unit";
import Upload from "../../screens/upload";
import { useAuth } from "../../context/auth";

const AppRoutes = () => {
  const auth = useAuth();
  return ( 
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/projects" element={<Project />} />
        <Route exact path="/units" element={<Unit />} />
        <Route exact path="/rooms" element={<Room />} />
        <Route exact path="/room-types" element={<RoomTypes />} />
        <Route exact path="/review" element={<ReviewUploads />} />
        <Route exact path="/uploads" element={<Upload />} />
        <Route exact path="/user-profile" element={<Accounts />} />
      </Routes>
      {auth.auth && <Footer />}
    </Router>
  );
};

export default AppRoutes;
