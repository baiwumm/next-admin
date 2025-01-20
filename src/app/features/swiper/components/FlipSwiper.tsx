/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-20 15:03:00
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 15:04:53
 * @Description: 翻转
 */
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Image } from '@heroui/react';
import { EffectFlip, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomImg } from '@/lib/utils';
export default function FlipSwiper() {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper
      effect="flip"
      grabCursor
      loop
      navigation
      pagination={{ clickable: true }}
      modules={[EffectFlip, Pagination, Navigation]}
      className="w-80 h-80"
    >
      {imgs.map((src: string, i: number) => (
        <SwiperSlide key={src + i}>
          <Image src={src} alt="FlipSwiper" removeWrapper className="w-full h-full object-cover" radius="sm" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
