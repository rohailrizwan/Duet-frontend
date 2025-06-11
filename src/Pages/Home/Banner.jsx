import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../../Components/Container";

function Banner({banners}) {  
  const settings = {
    dots: false,
    infinite: banners?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: banners?.length > 1,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    fade: banners?.length > 1
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {banners?.map((banner) => (
          <div key={banner.id}>
            <div
              className="relative w-full herosection1 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />
                {/* <Container> */}
                <div className="w-[90%] sm:max-w-[1200px]">
              <div className="relative z-20 px-0 h-full flex items-center justify-start text-white">
                  <div className="text-left">
                    <h1 className="text-3xl md:text-5xl md:w-[75%]    font_poppins font-bold mb-4" style={{lineHeight:"70px"}}>
                      {banner.altText}
                    </h1>
                    <p className="text-base md:text-lg md:w-[70%]  font_poppins text-gray-300" style={{lineHeight:"35px"}}>
                      {banner.subtitle}
                    </p>
                  </div>
              </div>
                </div>
                {/* </Container> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
