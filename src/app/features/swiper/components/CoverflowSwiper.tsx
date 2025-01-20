/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-20 15:31:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 15:57:02
 * @Description: 3d 流翻转
 */
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Image } from '@heroui/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomImg } from '@/lib/utils';
export default function CoverflowSwiper() {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      loop
      pagination={{
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination]}
      className="w-full"
    >
      {imgs.map((src: string, i: number) => (
        <SwiperSlide key={src + i} className="!w-80 !h-80">
          <Image src={src} alt="CoverflowSwiper" removeWrapper className="w-full h-full object-cover" radius="sm" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
