import Image from "next/image";
import useWindowSize from "../helper/useWindowSize";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_API}${src}?w=${width}&q=${quality || 75}`;
};

const SlideImage = ({ img }) => {
  const windowSize = useWindowSize();

  return (
    <div
      className='banner-container'
      style={{
        height: windowSize.width > 900 ? "500px" : "300px",
        width: "100%",
        position: "relative",
      }}>
      {windowSize && (
        <Image
          className='banner-img'
          priority={true}
          src={img}
          layout='fill'
          alt='banner'
          objectFit='cover'
          objectPosition='50% 50%'
          loader={myLoader}
          quality={windowSize.width > 900 ? 75 : 45}
        />
      )}
    </div>
  );
};

export default SlideImage;
