import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Colors from "../../assets/Style";
import PrimaryButton from "../../Components/BtnComponent";
function Banner() {
  var settings = {
    dots: false,
    infinite: true, // Enable infinite loop
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time interval between slides (in ms)
    pauseOnHover: false, // Autoplay should not stop on hover
  };
  return (
    <div className="w-[100%] ">
      <Slider {...settings}>
        <div className="herosection1 relative ">
          <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-1"></div>
          <div className="grid grid-cols-1 gap-4 items-center py-[80px] sm:pb-[60px] sm:pt-[200px]  px-6 h-[50vh] sm:h-[80vh] relative z-10 w-full">
            <div className="text-left  w-full sm:max-w-[1200px] mx-auto">
              <h1 className="text-white mb-5 bannerheading text-[24px] lg:text-[45px]">
                An Equal Opportunity, <br /> Employer
              </h1>
              <p className="text-white text-[12px] sm:text-[20px] mb-7">
                Connecting healthcare providers with top nursing talent. <br />
                Ensuring quality care with experienced professionals.
              </p>
              <div className="flex flex-row gap-2">
                <PrimaryButton
                  height="55px"
                  title="Hire Now"
                  p="5px 10px"
                  fontSize="16px"
                  color={Colors?.red}
                  endIcon={<ArrowForwardIcon />}
                  backgroundColor="white"
                  borderColor={Colors?.primary}
                />
                {/* <PrimaryButton
                  width="140px"
                  height="55px"
                  title="Apply Now"
                  p="5px 10px"
                  fontSize="16px"
                  color={Colors?.red}
                  backgroundColor="white"
                  borderColor={Colors?.red}
                /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="herosection2 relative">
          <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-1"></div>
          <div className="grid grid-cols-1 gap-4 items-center py-[80px] sm:block sm:pb-[60px] sm:pt-[150px] px-6 h-[50vh] sm:h-[100vh] relative z-10 w-full">
            <div className="text-left w-full sm:max-w-[1200px] mx-auto">
              <h1 className="text-white mb-5 bannerheading text-[24px] lg:text-[45px]">
                Recruiting Locally and, <br /> Internationally
              </h1>
              <p className="text-white text-[12px] sm:text-[20px] mb-7">
                Providing skilled nurses for hospitals and care facilities.{" "}
                <br />
                Reliable, compassionate, and ready to serve.
              </p>
              <div className="flex flex-row gap-2">
              <PrimaryButton
                  height="55px"
                  title="Apply Now"
                  p="5px 10px"
                  fontSize="16px"
                  color={Colors?.red}
                  endIcon={<ArrowForwardIcon />}
                  backgroundColor="white"
                  borderColor={Colors?.red}
                />
                {/* <PrimaryButton
                  width="140px"
                  height="55px"
                  title="Apply Now"
                  p="5px 10px"
                  fontSize="16px"
                  color={Colors?.red}
                  backgroundColor="white"
                  borderColor={Colors?.red}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Banner;
