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
    "https://png.pngtree.com/thumb_back/fw800/background/20220929/pngtree-shoes-promotion-banner-background-image_1466238.jpg",
  ];
  return (
    <Slider {...settings} className="overflow-hidden">
      {listBanner.map((image, index) => (
        <div key={index} className="banner-home">
          <img
            src={image}
            alt=""
            width={"100%"}
            style={{ height: "500px", objectFit: "cover" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
