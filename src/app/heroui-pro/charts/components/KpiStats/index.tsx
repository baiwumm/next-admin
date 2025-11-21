import { Chip, Spinner } from "@heroui/react";
import { useInViewport } from 'ahooks';
import { ReactNode, useRef, useState } from 'react';

// 导入所有组件
import KpiStat1 from './components/KpiStat1';
import KpiStat2 from './components/KpiStat2';
import KpiStat3 from './components/KpiStat3';
import KpiStat4 from './components/KpiStat4';
import KpiStat5 from './components/KpiStat5';
import KpiStat6 from './components/KpiStat6';
import KpiStat7 from './components/KpiStat7';
import KpiStat8 from './components/KpiStat8';
import KpiStat9 from './components/KpiStat9';

type KpiItem = {
  title: string;
  component: () => ReactNode;
  isFree?: boolean;
}

type KpiStatItemProps = {
  config: KpiItem;
}

function KpiStatItem({ config }: KpiStatItemProps) {
  const ref = useRef(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [inViewport] = useInViewport(ref, { threshold: 0, rootMargin: '100px' }); // 预加载

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


export default function KpiStats() {
  // 配置项：按顺序定义每个 KPI 的信息
  const kpiConfigs: KpiItem[] = [
    { title: "KpiStat 1", component: KpiStat1, isFree: true },
    { title: "KpiStat 2", component: KpiStat2, isFree: true },
    { title: "KpiStat 4", component: KpiStat4, isFree: true },
    { title: "KpiStat 3", component: KpiStat3 },
    { title: "KpiStat 5", component: KpiStat5 },
    { title: "KpiStat 6", component: KpiStat6 },
    { title: "KpiStat 7", component: KpiStat7 },
    { title: "KpiStat 8", component: KpiStat8 },
    { title: "KpiStat 9", component: KpiStat9 },
  ];
  return (
    <div className="flex flex-col gap-6">
      {kpiConfigs.map((config, index) => (
        <KpiStatItem key={index} config={config} />
      ))}
    </div>
  );
}