import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// const [token, setToken] = useState("");
// const [isSaved, setIsSaved] = useState(false);
// const [isCleared, setIsCleared] = useState(false);

// const saveData = (token) => {
//   //saving username to session storage
//   sessionStorage.setItem("token", token);

//   setIsSaved(true);
//   setTimeout(() => {
//     setIsSaved(false);
//   }, 2000);
// };

function Login({ token, setToken }) {
  const [name, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
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
      `https://q7k1p38k87.execute-api.eu-north-1.amazonaws.com/dev/user?userEmail=${name}&password=${password}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setToken(data.body)
        //   saveData(data.body);
          setUserName("");
          setPassword("");
          navigate("/fileUpload");
        } else {
          setError("Invalid Username or Password");
        }
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="p-5 rounded bg-white">
        <form>
          <h3>Sign In</h3>
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
              Sign In
            </button>
            {error ? <label style={{ color: "red" }}>{error}</label> : null}
          </div>
          <p className="text-end mt-2">
            <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
