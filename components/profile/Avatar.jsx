import React from "react";

const Avatar = ({ src, size, radius = "50" }) => {
  return (
    <div
      style={{
        background: src ? `url('${src}') ` : "#161A1F",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${radius}px`,
        border: "1px gray solid",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}></div>
  );
};

export default Avatar;
