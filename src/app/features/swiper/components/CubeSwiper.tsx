/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-20 13:42:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 14:24:57
 * @Description: 方块
 */
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { Image } from '@heroui/react';
import { EffectCube, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomImg } from '@/lib/utils';
export default function CubeSwiper() {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper
      effect="cube"
      grabCursor
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      loop
      pagination={{
        clickable: true,
      }}
      modules={[EffectCube, Pagination]}
      className="w-80 h-80"
    >
      {imgs.map((src: string, i: number) => (
        <SwiperSlide key={src + i}>
          <Image src={src} alt="CubeSwiper" removeWrapper className="w-full h-full object-cover" radius="sm" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
