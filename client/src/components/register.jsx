import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const resulte = await axios.post("http://localhost:4000/api/user", data);
    console.log(resulte.headers["x-auth-token"]);
    localStorage.setItem("x-auth-token", resulte.headers["x-auth-token"]);
    navigate("/comments");
  };

  return (
    <form
      onSubmit={(e) => {
        handelSubmit(e);
      }}
    >
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          name
        </label>
        <input
          type="text"
          class="form-control"
          required
          id="exampleInputPassword1"
          onChange={(ev) => setData({ ...data, username: ev.target.value })}
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          phone Number
        </label>
        <input
          type="text"
          class="form-control"
          required
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(ev) => setData({ ...data, phoneNumber: ev.target.value })}
        />
        <div id="emailHelp" class="form-text">
          We'll never share your details with anyone else.
        </div>
      </div>

      <button type="submit" class="btn btn-primary">
        sign up
      </button>
    </form>
  );
};

export default Register;
