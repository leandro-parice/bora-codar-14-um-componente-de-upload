/* eslint-disable react/prop-types */
const LoadingBar = ({ size }) => {
  return (
    <div className="loading-bar" style={{ "--width-percent": `${size}%` }}>
      <span className="loading"></span> <span className="percent">{`${size}%`}</span>
    </div>
  );
};

export default LoadingBar;
