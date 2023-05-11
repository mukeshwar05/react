import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "./FileUpload";

function App() {
  const [token, setToken] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login token={token} setToken={setToken} />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>

        {token && <Route path="/fileUpload" element={<FileUpload token={token} />}></Route>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
