/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-23 15:23:52
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 18:01:36
 * @Description: 图片预览
 */
'use client';

import { Card, CardBody, CardHeader, Divider, Image, Link } from '@heroui/react';
import { useMount } from 'ahooks';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { getRandomImg } from '@/lib/utils';

type ViewerImageSize = {
  width: number;
  height: number;
};

type ImageDecorator = {
  src: string;
  alt?: string;
  downloadUrl?: string;
  defaultSize?: ViewerImageSize;
};

export default function Viewer() {
  const t = useTranslations('Route');
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<ImageDecorator[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const ImgViewer = dynamic(() => import('react-viewer'), { ssr: false });

  // 图片列表
  const imgList = () =>
    (getRandomImg(20) as string[]).map((src: string) => ({
      src,
      downloadUrl: src,
    }));

  // 点击图片回调
  const handleClickImage = (index: number) => {
    setVisible(true);
    setActiveIndex(index);
  };

  useMount(() => {
    setImages(imgList());
  });
  return (
    <Card radius="sm">
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl font-bold">{t('viewer')}</h1>
          <Link
            isBlock
            isExternal
            showAnchorIcon
            color="primary"
            href="https://github.com/infeng/react-viewer"
            target="_blank"
          >
            react-viewer
          </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {images.map((item: ImageDecorator, i: number) => (
            <Image
              key={item.src + i}
              src={item.src}
              height={250}
              width="100%"
              onClick={() => handleClickImage(i)}
              alt="Image Viewer"
              className="cursor-pointer object-cover"
              radius="sm"
            />
          ))}
        </div>
        {/* 图片预览 */}
        <ImgViewer
          visible={visible}
          onClose={() => setVisible(false)}
          images={images}
          activeIndex={activeIndex}
          downloadable
          downloadInNewWindow
        />
      </CardBody>
    </Card>
  );
}
