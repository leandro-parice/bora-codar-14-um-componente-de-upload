/* eslint-disable react/prop-types */
import { FileIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingBar from "../LoadingBar";

const Upload = ({ data, onClick }) => {
  const [currentStatus, setCurrentStatus] = useState("sending");
  const [totalSize, setTotalSize] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);
  const [unit, setUnit] = useState("bytes");
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let bytes = data.size;
    if (bytes < 1024) {
      setTotalSize(bytes);
    } else if (bytes < 1048576) {
      setTotalSize((bytes / 1024).toFixed(0));
      setUnit("KB");
    } else {
      setTotalSize((bytes / 1048576).toFixed(0));
      setUnit("MB");
    }

    const acceptedFiles = ["application/pdf", "image/png", "image/jpg", "text/plain"];
    if (acceptedFiles.indexOf(data.type) === -1) {
      setCurrentStatus("error");
    } else {
      const interval = setInterval(() => {
        if (percentage >= 100) {
          setPercentage(100);
          clearInterval(interval);
          return;
        }
        const randomIncrement = Math.floor(Math.random() * 10) + 1;
        setPercentage((prevPercentage) => Math.min(prevPercentage + randomIncrement, 100));
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    setCurrentSize(((totalSize * percentage) / 100).toFixed(0));
    if (percentage === 100) {
      setCurrentStatus("success");
    }
  }, [percentage]);

  return (
    <div className={`upload ${currentStatus}`}>
      <div className="icon">
        {currentStatus === "sending" ? <FileIcon color="#AC96E4" size={20} /> : null}
        {currentStatus === "success" ? <FileIcon color="#73b172" size={20} /> : null}
        {currentStatus === "error" ? <FileIcon color="#e36363" size={20} /> : null}
      </div>
      <div className="content">
        <strong className="file">{data.name}</strong>
        <span className="size">
          {currentSize} {unit} / {totalSize} {unit}
        </span>
        <LoadingBar size={percentage} />
      </div>
      <button className="action" onClick={() => onClick(data.name)}>
        {currentStatus === "sending" ? <XIcon color="#AC96E4" size={18} /> : null}
        {currentStatus === "success" ? <XIcon color="#73b172" size={18} /> : null}
        {currentStatus === "error" ? <XIcon color="#e36363" size={18} /> : null}
      </button>
    </div>
  );
};

export default Upload;
