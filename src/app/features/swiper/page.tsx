/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-20 11:24:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 17:11:49
 * @Description: Swiper 幻灯片
 */
'use client';
import 'swiper/css';
import './index.scss';

import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { useTranslations } from 'next-intl';
import type { CreativeEffectOptions } from 'swiper/types';

import CardSwiper from './components/CardSwiper';
import CoverflowSwiper from './components/CoverflowSwiper';
import CreativeSwiper from './components/CreativeSwiper';
import CubeSwiper from './components/CubeSwiper';
import FlipSwiper from './components/FlipSwiper';
import ThumbnailSwiper from './components/ThumbnailSwiper';
import VisualSwiper from './components/VisualSwiper';

export default function Swiper() {
  const t = useTranslations('Pages.swiper');

  const creativeEffectOptions: CreativeEffectOptions[] = [
    {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
    {
      prev: {
        shadow: true,
        translate: ['-120%', 0, -500],
      },
      next: {
        shadow: true,
        translate: ['120%', 0, -500],
      },
    },
    {
      prev: {
        shadow: true,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
    {
      prev: {
        shadow: true,
        translate: [0, 0, -800],
        rotate: [180, 0, 0],
      },
      next: {
        shadow: true,
        translate: [0, 0, -800],
        rotate: [-180, 0, 0],
      },
    },
    {
      prev: {
        shadow: true,
        translate: ['-125%', 0, -800],
        rotate: [0, 0, -90],
      },
      next: {
        shadow: true,
        translate: ['125%', 0, -800],
        rotate: [0, 0, 90],
      },
    },
    {
      prev: {
        shadow: true,
        origin: 'left center',
        translate: ['-5%', 0, -200],
        rotate: [0, 100, 0],
      },
      next: {
        origin: 'right center',
        translate: ['5%', 0, -200],
        rotate: [0, -100, 0],
      },
    },
  ];
  return (
    <div className="grid gap-4 grid-cols-12">
      <Card className="col-span-12 sm:col-span-6 md:col-span-4" radius="sm">
        <CardHeader>
          <h4 className="font-bold text-large">{t('cube')}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden py-6">
          <CubeSwiper />
        </CardBody>
      </Card>
      <Card className="col-span-12 sm:col-span-6 md:col-span-4" radius="sm">
        <CardHeader>
          <h4 className="font-bold text-large">{t('flip')}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden py-6">
          <FlipSwiper />
        </CardBody>
      </Card>
      <Card className="col-span-12 sm:col-span-6 md:col-span-4" radius="sm">
        <CardHeader>
          <h4 className="font-bold text-large">{t('card')}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden py-6">
          <CardSwiper />
        </CardBody>
      </Card>
      <Card className="col-span-12 sm:col-span-6 md:col-span-6" radius="sm">
        <CardHeader>
          <h4 className="font-bold text-large">{t('coverflow')}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden py-6">
          <CoverflowSwiper />
        </CardBody>
      </Card>
      <Card className="col-span-12 sm:col-span-6 md:col-span-6" radius="sm">
        <CardHeader>
          <h4 className="font-bold text-large">{t('thumbnail')}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden py-6">
          <ThumbnailSwiper />
        </CardBody>
      </Card>
      <Card className="col-span-12" radius="sm">
        <CardHeader>
          <h4 className="font-bold text-large">{t('creative')}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden py-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {creativeEffectOptions.map((option, i) => (
              <CreativeSwiper key={i} creativeEffect={option} />
            ))}
          </div>
        </CardBody>
      </Card>
      <Card className="col-span-12" radius="sm">
        <CardHeader>
          <h4 className="font-bold text-large">{t('visual')}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden py-6">
          <VisualSwiper />
        </CardBody>
      </Card>
    </div>
  );
}
