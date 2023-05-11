import React from "react";
import { useState, useEffect } from "react";

function FileUpload({token}) {
  const [file, setFile] = useState();

  function handleFile(event) {
    setFile(event.target.files[0]);
  }
  function handleUpload(e) {
    e.stopPropagation();
    const formData = new FormData();
    formData.append("File", file);
    fetch(
      `https://q7k1p38k87.execute-api.eu-north-1.amazonaws.com/dev/upload/myawspoc-storage/${file.name}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          authorizationToken: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setFile("");
        setIsChanged(true);
        console.log("success", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [fileData, setFileData] = useState([]);
  const [isChanged, setIsChanged] = useState(true);

  const fetchFiles = async () => {
    await fetch(
      "https://q7k1p38k87.execute-api.eu-north-1.amazonaws.com/dev/listfile?bucket=myawspoc-storage",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) {
          const files = result.body;
          setFileData(files);
          setIsChanged(false);
          console.log(files);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isChanged === true) {
      fetchFiles();
      setIsChanged(false);
    }
  }, [isChanged]);

  return (
    <div>
      <h2>File Uploading into S3</h2>
      <input type="file" name="file" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
      <h2>{fileData}</h2>
    </div>
  );
}

export default FileUpload;
