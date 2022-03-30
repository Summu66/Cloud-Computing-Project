import { useState } from "react";
import "./styles/app.css";
function App() {
  const [fileData, setFileData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");
  const onFileChange = (e) => {
    const data = e.target;
    if (data.files.length !== 1) return;
    const fileSize = Math.round(data.files[0].size / 1024);
    if (fileSize >= 8 * 1096) {
      e.target.value = null;
      alert("File too big");
    } else setFileData(data.files[0]);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!fileData) return;
    const data = new FormData();
    // api
    const server = "http://localhost:3000";
    data.append("fileData", fileData);
    setLoading(true);
    fetch(`${server}/file/upload`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log("Posted", fileData);
        setLoading(false);
        setUploadText(`Successful uploaded ${fileData.name}`);
      })
      .catch((err) => {
        console.log(err);
        setUploadText(`Something went wrong`);
      });
    console.log(data);
  };
  return (
    <div className="myApp">
      <h1>Back up a file</h1>
      <form onSubmit={onFormSubmit}>
        <input type="file" onChange={onFileChange} />
        <br />
        {isLoading ? (
          <div className="loader" />
        ) : (
          <button type="Submit">Submit</button>
        )}
        <br />
        {uploadText}
      </form>
    </div>
  );
}

export default App;
