/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-20 15:44:49
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 16:01:58
 * @Description: 缩略图
 */
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { Image } from '@heroui/react';
import { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

import { getRandomImg } from '@/lib/utils';
export default function ThumbnailSwiper() {
  const imgs = getRandomImg(20) as string[];
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const onThumbsSwiper = (swiper: SwiperClass) => {
    setThumbsSwiper(swiper);
  };
  return (
    <div className="h-80">
      <Swiper
        loop
        spaceBetween={10}
        navigation
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full h-4/5"
      >
        {imgs.map((src: string, i: number) => (
          <SwiperSlide key={src + i}>
            <Image src={src} removeWrapper alt="CubeSwiper" className="w-full h-full object-cover" radius="sm" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 缩略图 */}
      <Swiper
        loop
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs-swiper h-1/5 !pt-2.5"
        onSwiper={onThumbsSwiper}
      >
        {imgs.map((src: string, i: number) => (
          <SwiperSlide key={src + i}>
            <Image src={src} alt="CubeSwiper" removeWrapper className="w-full h-full object-cover" radius="sm" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
