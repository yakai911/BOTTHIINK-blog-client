import useWindowSize from "../../helper/useWindowSize";
import Image from "next/image";

export const CarouselItem = ({ item, items, goToIndex }) => {
  const size = useWindowSize();
  const windowWidth = size.width;

  return (
    <>
      <a href={item.link}>
        <div
          style={{
            height: windowWidth > 900 ? "600px" : "300px",
            position: "relative",
          }}
          className='carousel-item'>
          <h1>{item.title}</h1>
          <ol className='indiactors-container'>
            {items.map((_, index) => (
              <li
                className='carousel-indicators'
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  goToIndex(index);
                }}></li>
            ))}
          </ol>
          <Image
            src={item.src}
            loading='lazy'
            alt='banner'
            width={item.width}
            height={item.height}
            className='slider-image'
            quality={size.width > 900 ? 75 : 50}
          />
        </div>
      </a>
    </>
  );
};
