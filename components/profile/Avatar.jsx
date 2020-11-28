import React from "react";

const Avatar = ({ src, size, radius = "50" }) => {
  return (
    <div
      style={{
        background: src ? `url('${src}') ` : "#161A1F",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${radius}px`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}></div>
  );
};

export default Avatar;
