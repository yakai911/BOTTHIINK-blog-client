import { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import useWindowSize from "../helper/useWindowSize";
import Image from "next/image";

const items = [
  {
    src: "/images/recent.jpg",
    title: "Reacent Post",
    description: "",
    link: "/categories/recent-post",
    width: 2048,
    height: 1701,
  },
  {
    src: "/images/featured.png",
    title: "Featured",
    description: "",
    link: "/categories/featured",
    width: 1920,
    height: 1657,
  },
  {
    src: "/categories/trending.png",
    title: "Trending",
    description: "",
    link: "/categories/trending",
    width: 1920,
    height: 1299,
  },
];

const CarouselComponent = () => {
  const size = useWindowSize();
  const windowWidth = size.width;

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        className='custom-tag'
        tag='div'
        key={index}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}>
        <a href={item.link}>
          <div
            style={{
              height: windowWidth > 900 ? "500px" : "300px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Image
              src={item.src}
              layout='fill'
              alt='banner'
              quality={100}
              width={item.width}
              height={item.height}
            />
          </div>
        </a>
        <CarouselCaption
          className='text-white'
          captionText={item.description}
          captionHeader={item.title}
        />
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {`.custom-tag {
              max-width: 100%;
              height: 500px;      
              background-size: cover;
              background-position: center center;
            }
            h3{
              color:white;
              fontWeight:bold;
            }
            .sr-only{
              display:none;
            }

            @media screen and (max-width:900px){
              .custom-tag{
               height:300px;
              }
            }
            `}
      </style>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction='prev'
          directionText=''
          onClickHandler={previous}
        />
        <CarouselControl
          direction='next'
          directionText=''
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
