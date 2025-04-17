import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';

function Banner() {
  const banners = [
    { id: 1, image: banner1, altText: "Banner 1" },
    { id: 2, image: banner2, altText: "Banner 2" }
  ];

  const settings = {
    dots: false,
    infinite: true, // Enable infinite loop
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time interval between slides (in ms)
    pauseOnHover: false,
    fade: true // Autoplay should not stop on hover
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div
              className="relative w-full herosection1 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />
              <div className="relative z-20 px-6 h-full flex items-center justify-start text-white">
                {/* Add content if needed */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
