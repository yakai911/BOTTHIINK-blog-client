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
    id: 1,
    altText: "地下",
    title: "地下",
    description:
      "楼梯很高，梯级也很陡，但幸好不是那种直上直下的梯子。是S形的楼梯，通向很下面的一个没有光的空间，走得人有点头晕。他忽然说，今天放的这部是那个著名韩国导演最新的作品，在好几个电影节他都很有希望获奖。 ",
    src:
      "https://raw.githubusercontent.com/yakai911/blogsite/master/src/assets/images/pic3.jpg",
  },
  {
    id: 2,
    altText: "火箭打油诗",
    title: "火箭打油诗",
    description:
      "有个小伙子叫克洛健， 他红杏出墙，睡了火箭。 如果在外面看见它们， 你会忍不住睁大眼看， 你若没试过，最好靠边站！",
    src:
      "https://raw.githubusercontent.com/yakai911/blogsite/master/src/assets/images/pic5.jpg",
  },
  {
    id: 3,
    altText: "侦探的咖啡",
    title: "侦探的咖啡",
    description:
      "他面对着这个游戏，被拉低到了同一张桌面上，在他不得不面对它却又不清楚底细的情况下，妄想维持自己忧虑的攻击性。",
    src:
      "https://raw.githubusercontent.com/yakai911/blogsite/master/src/assets/images/pic1.png",
  },
];

const CarouselComponent = (props) => {
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

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className='custom-tag'
        tag='div'
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}>
        <SlideImage img={item.src} />
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
          directionText='上一页'
          onClickHandler={previous}
        />
        <CarouselControl
          direction='next'
          directionText='下一页'
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
