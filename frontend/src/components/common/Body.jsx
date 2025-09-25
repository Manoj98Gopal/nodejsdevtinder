import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import api from "@/utils/http";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/app/userSlice";

const Body = () => {
  const userData = useSelector((store) => store.userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUserDetails = async () => {
    if (userData) return;
    try {
      const response = await api.get("/profile/view");
      dispatch(updateUserData(response.data.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error("Unable to get user details :", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
