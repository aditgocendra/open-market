"use client";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const CarouselComponent = () => {
  return (
    <Carousel
      showIndicators
      showThumbs={false}
      width='100%'
      dynamicHeight={false}>
      <Image
        src='/images/banner/banner-default-1.png'
        className='rounded-lg'
        width={960}
        height={240}
        alt='banner'
      />

      <Image
        src='/images/banner/banner-default-2.png'
        className='rounded-xl'
        width={960}
        height={240}
        alt='banner'
      />

      <Image
        src='/images/banner/banner-default-3.png'
        className='rounded-lg'
        width={960}
        height={240}
        alt='banner'
      />
    </Carousel>
  );
};
