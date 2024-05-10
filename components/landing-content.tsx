"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import { Autoplay, EffectCube } from 'swiper/modules';
import Image from "next/image";
const LandingContent = () => {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="w-56 sm:w-64 md:w-[450px]">
        <Swiper
          effect={'cube'}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}

          loop={true}
          modules={[Autoplay,EffectCube]}
        >
          <SwiperSlide><Image src="/ai_1.png" alt="image" width={450} height={300} className=" rounded-md"></Image></SwiperSlide>
          <SwiperSlide><Image src="/ai_2.png" alt="image" width={450} height={300} className=" rounded-md"></Image></SwiperSlide>
          <SwiperSlide><Image src="/ai_3.png" alt="image" width={450} height={300} className=" rounded-md"></Image></SwiperSlide>
          <SwiperSlide><Image src="/ai_4.png" alt="image" width={450} height={300} className=" rounded-md"></Image></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default LandingContent;