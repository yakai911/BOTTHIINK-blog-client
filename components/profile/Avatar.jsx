import React from "react";

const Avatar = ({ src, size }) => {
  return (
    <div
      style={{
        background: src ? `url('${src}') ` : "#ccc",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50px",
        border: "1px gray solid",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}></div>
  );
};

export default Avatar;
