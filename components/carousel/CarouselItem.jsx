import useWindowSize from "../../helper/useWindowSize";
import Image from "next/image";
import Link from "next/link";

export const CarouselItem = ({ item, items, goToIndex }) => {
  const windowSize = useWindowSize();
  const windowWidth = windowSize.width;

  return (
    <>
      <Link href={item.link}>
        <div
          style={{
            height: windowWidth > 900 ? "600px" : "300px",
            width: "100%",
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
          {windowWidth && (
            <Image
              src={item.src}
              priority={true}
              alt='banner'
              layout='fill'
              objectFit='cover'
              objectPosition='50% 50%'
              className='slider-image'
            />
          )}
        </div>
      </Link>
    </>
  );
};
