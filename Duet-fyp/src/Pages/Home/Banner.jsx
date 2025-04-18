import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import Container from "../../Components/Container";

function Banner() {
  const banners = [
    {
      id: 1,
      image: banner1,
      altText: "Empowering DUET Alumni & Students",
      subtitle: 'Reconnect with your alumni network, share your journey and insights, and help guide the future of the community by mentoring and sharing experiences.'
    },
    {
      id: 2,
      image: banner2,
      altText: "Your Journey from Campus to Career Starts Here",
      subtitle: "Explore valuable mentorship, gain access to diverse job opportunities, and uncover real-world insights that will shape the path to your successful future."
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    fade: true
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
                <Container>
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
                </Container>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
