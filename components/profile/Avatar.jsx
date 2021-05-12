import React from "react";

const Avatar = ({ src, size, radius }) => {
  return (
    <div
      style={{
        backgroundImage: src ? `url('${src}') ` : "",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: radius ? `${radius}px` : "50%",
        backgroundSize: "cover",
        backgroundPositionX: "center",
        bcakgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}></div>
  );
};

export default Avatar;
