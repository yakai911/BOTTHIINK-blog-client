import React from "react";
import Image from "next/image";

const PostImg = ({ src, width, height, radius = "50", shadow = true }) => {
  const contentfulLoader = ({ src, quality, width }) => {
    const params = [`w=${width}`];

    if (quality) {
      params.push(`q=${quality}`);
    }

    return `${src}?${params.join("&")}`;
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: src ? `url('${src}')` : "#e6f7ff",
        width: `${width}`,
        height: `${height}`,
        borderRadius: `${radius}px`,
        boxShadow:
          shadow &&
          `6px 6px 10px rgba(0, 0, 0, 0.6),
        -6px -6px 26px rgba(255, 255, 255, 0.8)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}>
      {/* <Image
        src={src}
        quality={100}
        width={width}
        height={height}
        layout='responsive'
        objectFit='contain'
        alt='background image'
      /> */}
    </div>
  );
};

export default PostImg;
