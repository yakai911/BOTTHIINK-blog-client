import { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import SlideImage from "./SlideImage";

const items = [
  {
    src:
      "https://res.cloudinary.com/hapmoniym/image/upload/v1601987038/img/pic3_f65bzg.jpg",
    title: "Reacent Post",
    description: "",
    link: "/categories/recent-post",
  },
  {
    src:
      "https://res.cloudinary.com/hapmoniym/image/upload/v1606821627/img/featured_pw1bzg.png",
    title: "Featured",
    description: "",
    link: "/categories/featured",
  },
  {
    src:
      "https://res.cloudinary.com/hapmoniym/image/upload/v1606821628/img/trending_ykv0lv.png",
    title: "Trending",
    description: "",
    link: "/categories/trending",
  },
];

const CarouselComponent = () => {
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
          <SlideImage img={item.src} />
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
