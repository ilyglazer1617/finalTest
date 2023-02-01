import React, { useEffect, useState } from "react";
import axios from "axios";
import "../comment.css";
import jwtdecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const navigate = useNavigate();

  let token = localStorage.getItem("x-auth-token");
  let phonenumber;
  if (token) {
    const { phoneNumber } = jwtdecode(token);
    phonenumber = phoneNumber;
  }

  useEffect(() => {
    getallComments();
  }, []);
  const [data, setData] = useState({ username: localStorage.getItem("name") });
  const [alldata, setAllData] = useState([]);

  const [visible, setVisible] = useState(false);
  const [visibilities, setVisibilities] = useState([
    "hidden",
    "hidden",
    "hidden",
    "hidden",
    "hidden",
  ]);

  //! logout
  const logOut = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("name");
    navigate("/");
  };

  //! gets the user
  useEffect(() => {
    if (token) getUser();
  }, [token]);
  const handelSubmitbefore = (index) => {
    // setData({ ...data, name: alldata[index].name });
    handelSubmit();
  };

  //! signs a user to a job
  const handelSubmit = async (index) => {
    console.log(data);
    await axios.put("http://localhost:4000/api/job/like", data, {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
  };
  //! gets the user

  async function getUser() {
    try {
      const results = await axios.get(
        `http://localhost:4000/api/user/${phonenumber}`
      );
      setData({ username: results.data.username });
    } catch (error) {
      return error;
    }
  }

  //! gets all the jobs

  async function getallComments() {
    const results = await axios.get(`http://localhost:4000/api/job`, {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    setAllData(results.data);
  }
  return (
    <div>
      <table className="cinereousTable">
        <thead>
          <tr>
            <th></th>
            <th>job</th>
            <th>info </th>
            <th>apply </th>
          </tr>
        </thead>

        <tbody>
          {alldata.map((val, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{val.name}</td>
              <td>
                {" "}
                <button
                  onClick={() => {
                    const newVisibilities = [...visibilities];
                    newVisibilities[index] = !newVisibilities[index];
                    setVisibilities(newVisibilities);
                  }}
                >
                  more info
                </button>
                <p
                  style={{
                    visibility: visibilities[index] ? "hidden" : "visible",
                  }}
                >
                  {val.info}
                </p>
              </td>
              <td>
                <button
                  onClick={() => {
                    setData({ ...data, name: alldata[index].name });
                    handelSubmitbefore(index);
                  }}
                >
                  dubble click to apllay!{}
                </button>
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="buttonOut" onClick={() => logOut()}>
        {" "}
        <b>log Out</b>{" "}
      </button>
    </div>
  );
};

export default AllJobs;
