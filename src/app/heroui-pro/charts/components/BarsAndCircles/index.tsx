import { Chip, Spinner } from "@heroui/react";
import { useInViewport } from 'ahooks';
import { ReactNode, useRef, useState } from 'react';

import Bars1 from './components/Bars1';
import Bars2 from './components/Bars2';
import Bars3 from './components/Bars3';
import Bars4 from './components/Bars4';
import Circles3 from './components/Circles3';
import Circles4 from './components/Circles4';
import Circles5 from './components/Circles5';
import Circles6 from './components/Circles6';

type Item = {
  title: string;
  component: () => ReactNode;
  isFree?: boolean;
}

type BarsAndCircleItemProps = {
  config: Item;
}

function BarsAndCircleItem({ config }: BarsAndCircleItemProps) {
  const ref = useRef(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [inViewport] = useInViewport(ref, { threshold: 0, rootMargin: '100px' }); // 10% 进入视口即触发

  // 一旦进入过视口，就永久标记为已加载
  if (inViewport && !hasBeenVisible) {
    setHasBeenVisible(true);
  }

  const { title, component: Component, isFree } = config;

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {isFree && <Chip color="success" variant="bordered">Free</Chip>}
      </div>
      {/* 只有进入视口才渲染实际组件 */}
      {hasBeenVisible ? <Component /> : (
        <div className="min-h-50 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default function BarsAndCircles() {
  const items: Item[] = [
    { title: "Circles 3", component: Circles3, isFree: true },
    { title: "Circles 5", component: Circles5, isFree: true },
    { title: "Circles 6", component: Circles6, isFree: true },
    { title: "Bars 1", component: Bars1 },
    { title: "Bars 2", component: Bars2 },
    { title: "Bars 3", component: Bars3 },
    { title: "Bars 4", component: Bars4 },
    { title: "Circles 4", component: Circles4 },
  ]
  return (
    <div className="flex flex-col gap-6">
      {items.map((config, index) => (
        <BarsAndCircleItem key={index} config={config} />
      ))}
    </div>
  )
}