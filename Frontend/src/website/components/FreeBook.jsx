import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Cards from "./Cards";
import axios from "axios";

function FreeBook() {

  const [book, setBook] = useState([]);
 useEffect(() => {
  const getBook = async () => {
    try {
      const res = await axios.get("http://localhost:4001/book");
      const freeBooks = res.data.filter((item) => item.category === "Free");
      console.log(freeBooks);
      setBook(freeBooks);
    } catch (error) {
      console.log(error);
    }
  };
  getBook();
}, []);


  
  // const filterData = list.filter((data) => data.category === "Free");

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
        
      </div>

      <Slider {...settings}>
        {book.map((item) => (
          <div key={item.id} className="px-3">
            <Cards item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FreeBook;
