import { useState } from "react";
import useWindowSize from "../../helper/useWindowSize";

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
    src: "/images/trending.png",
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
        item={item}
        key={index}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      />
    );
  });

  return (
    <div>
      <div activeIndex={activeIndex} next={next} previous={previous}>
        <div
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <i onClick={previous}>上一张</i>
        <i onClick={next}>下一张</i>
      </div>
    </div>
  );
};

export default CarouselComponent;
