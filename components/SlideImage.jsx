const SlideImage = ({ img }) => {
  return (
    <div
      className='banner'
      style={{
        height: "500px",
        width: "100%",
        background: `url('${img}') no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}></div>
  );
};

export default SlideImage;
