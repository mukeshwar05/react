import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [name, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleUserName(event) {
    setUserName(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  async function handleForm(e) {
    e.stopPropagation();
    e.preventDefault();
    await fetch(
      "https://q7k1p38k87.execute-api.eu-north-1.amazonaws.com/dev/user",
      {
        method: "POST",
        body: JSON.stringify({
          userEmail: name,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 201) {
          setUserName("");
          setPassword("");
          navigate('/');
        }
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="signup template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="p-5 rounded bg-white">
        <form>
          <h3>Sign Up</h3>
          <div className="mb-2">
            <label>UserName</label>
            <input
              type="name"
              placeholder="Enter UserName"
              className="form-control"
              onChange={handleUserName}
            />
          </div>
          <div className="mb-2">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              onChange={handlePassword}
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" onClick={handleForm}>
              Sign Up
            </button>
          </div>
          <p className="text-end mt-2">
            Already Registered ?<Link to="/">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
