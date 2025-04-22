import { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* eslint-disable react/prop-types */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isPasswordValid = (password) => {
  return !password.includes(" ") && password.trim() !== "";
};

const UserProvider = ({ children }) => {
  // URL:
  let base = "http://localhost:5500";
  let path = "/user/";
  let url = new URL(path, base).href;

  const [user, setUser] = useState(null);

  async function myProfileRequest() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const response = await axios.get(url + "profile", { headers });
      setUser(response.data.user);
    } catch (error) {
      toast(error.response.data.msg);
      console.error(error.data.msg);
    }
  }

  async function loginUserRequest({ email, password }) {
    if (!validateEmail(email)) return toast("Valid Email Required");
    if (!isPasswordValid(password)) return toast("Valid Password Required");

    //   API Request to login
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        url + "login",
        {
          email,
          password,
        },
        { headers }
      );
      toast(response.data.msg);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
    } catch (error) {
      toast(error.response.data.msg);
    }
  }

  async function registerUserRequest({ name, email, password }) {
    //   API Request to login
    try {
      if (!name) return toast("Name Required");
      if (!validateEmail(email)) return toast("Valid Email Required");
      if (!isPasswordValid(password)) return toast("Valid Password Required");

      const headers = {
        "Content-Type": "application/json",
      };

      const myData = {
        name,
        email,
        password,
      };

      const response = await axios.post(url + "create", myData, { headers });
      toast(response.data.msg);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
    } catch (error) {
      toast(error.response.data.msg);
    }
  }

  async function resetPasswordRequest({ oldPassword, newPassword }) {
    const token = JSON.parse(localStorage.getItem("token"));
    //   API Request to Reset Password
    try {
      if (!oldPassword) return toast("Old Password Required");
      if (!newPassword) return toast("New Password Required");

      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const myData = {
        oldPassword,
        newPassword,
      };

      const response = await axios.put(url + "resetpassword", myData, {
        headers,
      });
      toast(response.data.msg);
    } catch (error) {
      toast(error.response.data.msg);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        myProfileRequest,
        loginUserRequest,
        registerUserRequest,
        resetPasswordRequest,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
