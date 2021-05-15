import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
      }}>
      <p
        style={{
          fontWeight: "500",
          marginBottom: "20px",
          letterSpacing: "0.5px",
          color: "#444",
        }}>
        Copyright © 2021 BOT THK. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
