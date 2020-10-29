const Image = ({ img }) => {
  console.log(img);
  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        background: `url('${img}') no-repeat`,
        backgroundSize: " cover",
        backgroundPosition: "center center",
      }}></div>
  );
};

export default Image;
