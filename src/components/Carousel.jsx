// image carousel for home/front page
// credit to "Code Complete" & "Johan Alves" for their tutorials how to setup the carousel
import { useState, useEffect } from "react";
import "../css/carousel.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function Carousel({ data, autoSlide = true, interval = 3000 }) {
  // destructured props to support carousel function
  // data prop: passed from json file to keep UI logic separate from the content for a cleaner codebase & eventual reusability & scalability
  // autoSlide & interval passed as props to set the auto scrolling parameters
  const [slide, setSlide] = useState(0);
  console.log(data);

  //   function to control "left arrow" clicking to previous slide
  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  //   function to control "right arrow" clicking to the next slide
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  // auto-slide show effect
  useEffect(() => {
    if (!autoSlide) return;

    // setInterval: web based API to set the timer to call the nextSlide() function
    const slideInterval = setInterval(() => {
      nextSlide();
    }, interval);

    // clearInterval: web based API to clear the timer
    return () => clearInterval(slideInterval);
  }, [slide, autoSlide, interval]);

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide} />
      {data.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? "slide" : "slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={nextSlide}
      />
      <span className="indicators">
        {/* image rendering by mapping over the data to display only the image that is determined to be active by idx(the index) */}
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
            ></button>
          );
        })}
      </span>
    </div>
  );
}

export default Carousel;
