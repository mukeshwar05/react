import React from "react";
import { useState } from "react";

function App() {
  const [file, setFile] = useState();

  function handleFile(event) {
    setFile(event.target.files[0]);
  }
  async function handleUpload(e) {
    e.stopPropagation();
    const formData = new FormData();
    formData.append("File", file);
    await fetch(
      `https://tr593l1uo0.execute-api.eu-north-1.amazonaws.com/dev/bucket/myawspoc-storage/${file.name}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "muki", 
        },
      }
    )
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

      <input type="file" name="file" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
