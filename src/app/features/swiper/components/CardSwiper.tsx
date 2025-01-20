/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-20 15:12:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 16:02:37
 * @Description: 卡片特效
 */
import 'swiper/css/effect-cards';

import { Image } from '@heroui/react';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getRandomImg } from '@/lib/utils';
export default function CardSwiper() {
  const imgs = getRandomImg(8) as string[];
  return (
    <Swiper effect="cards" grabCursor loop modules={[EffectCards]} className="w-60 h-80">
      {imgs.map((src: string, i: number) => (
        <SwiperSlide key={src + i}>
          <Image src={src} alt="CardSwiper" removeWrapper className="w-full h-full object-cover" radius="sm" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
