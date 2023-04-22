import React from "react";
import Slider from "react-slick";
const Banner: React.FC = () => {
  var settings = {
    dots: false,
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const listBanner = [
    "https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/December2022/banner-cm24.jpg_12-51-43-927.jpg",
    "https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/December2022/banner-cm24.jpg_12-51-43-927.jpg",
    "https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/December2022/banner-cm24.jpg_12-51-43-927.jpg",
  ];
  return (
    <Slider {...settings} className="overflow-hidden">
      {listBanner.map((image, index) => (
        <div key={index} className="banner-home">
          <img src={image} alt="" width={"100%"} />
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
