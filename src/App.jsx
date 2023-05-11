import Upload from "./components/Upload";
import DropArea from "./components/DropArea";
import { useState } from "react";

const App = () => {
  const [files, setFiles] = useState([]);

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newFiles = event.dataTransfer.files;
    setFiles([...files, ...newFiles]);
  };

  const handleInputChange = (event) => {
    const filesArray = Array.from(event.target.files);
    setFiles([...files, ...filesArray]);
  };

  const handleCloseClick = (filename) => {
    const filteredFiles = files.filter((file) => file.name !== filename);
    setFiles(filteredFiles);
  };

  return (
    <div className="app">
      <DropArea onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onChange={handleInputChange} />
      <div className="upload-itens">
        {files.map((file, index) => (
          <Upload data={file} key={index} onClick={handleCloseClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
