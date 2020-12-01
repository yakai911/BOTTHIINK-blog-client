import React from "react";

const PostImg = ({ src, width, height, radius = "50" }) => {
  return (
    <div
      style={{
        background:
          src.slice(-10, 1) !== "/undefined" ? `url('${src}')` : "#e6f7ff",
        width: `${width}`,
        height: `${height}`,
        borderRadius: `${radius}px`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        boxShadow: `6px 6px 10px rgba(0, 0, 0, 0.6),
        -6px -6px 26px rgba(255, 255, 255, 0.8)`,
      }}></div>
  );
};

export default PostImg;
