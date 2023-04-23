import React from "react";
import { useState } from "react";

function App() {
  const[file, setFile] = useState();
  function handleFile(event) {
    setFile(event.target.files[0]);
  }
  function handleUpload() {
    const formData = new FormData();
    formData.append("file", file);
    fetch('https://tr593l1uo0.execute-api.eu-north-1.amazonaws.com/dev/myawspoc-storage/'+file, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("success", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <h2>File Uploading into S3</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" onChange={handleFile} />
        <button>Upload</button>
      </form>
    </div>
  );
}

export default App;
