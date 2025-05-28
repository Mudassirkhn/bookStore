import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import list from "../../public/List.json";
import Cards from "./Cards";

function FreeBook() {
  const filterData = list.filter((data) => data.category === "Free");

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12">
      <div className="pb-8">
        <h1 className="text-xl md:text-3xl font-bold pb-2">Free Offered Courses</h1>
        <p className="text-gray-600">
          Check out our hand-picked free courses to kickstart your learning journey!
        </p>
      </div>

      <Slider {...settings}>
        {filterData.map((item) => (
          <div key={item.id} className="px-3">
            <Cards item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FreeBook;
