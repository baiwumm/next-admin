/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-20 16:08:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 16:55:30
 * @Description: 创意效果
 */
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import { Image } from '@heroui/react';
import { EffectCreative, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { CreativeEffectOptions } from 'swiper/types';

import { getRandomImg } from '@/lib/utils';

type CreativeSwiperProps = {
  creativeEffect: CreativeEffectOptions;
};
export default function CreativeSwiper({ creativeEffect = {} }: CreativeSwiperProps) {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper
      effect="creative"
      grabCursor
      centeredSlides
      loop
      creativeEffect={creativeEffect}
      pagination={{
        clickable: true,
      }}
      modules={[EffectCreative, Pagination]}
      className="w-80 h-60"
    >
      {imgs.map((src: string, i) => (
        <SwiperSlide key={src + i}>
          <Image src={src} alt="CreativeSwiper" removeWrapper className="w-full h-full object-cover" radius="sm" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
