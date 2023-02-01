import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jobImg from "./images/jobPhoto.jpg";
import "./style/login.css";
const SignIn = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const resulte = await axios.post("http://localhost:4000/api/login", data);

    localStorage.setItem("x-auth-token", resulte.headers["x-auth-token"]);
    localStorage.setItem("name", data.username);
    navigate("/comments");
  };

  return (
    <div className="loginCon">
      <form
        onSubmit={(e) => {
          handelSubmit(e);
        }}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            user name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            phon Nunber
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>{" "}
        <button class="btn btn-primary" onClick={() => navigate("register")}>
          sign Up
        </button>
      </form>
      <div className="imgConteiner">
        <img src={jobImg} alt="" />
      </div>
    </div>
  );
};

export default SignIn;
