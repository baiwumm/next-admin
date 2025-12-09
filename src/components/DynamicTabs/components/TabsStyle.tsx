/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-05 16:18:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-09 11:35:10
 * @Description: 按钮风格
 */
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Pin } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { useShallow } from "zustand/react/shallow";

import SortableTabItem from './SortableTabItem';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { pick } from '@/lib/utils';
import { useTabsStore } from "@/store/useTabsStore";

type TabsStyleProps = {
  dashboardTab: System.Menu | undefined;
}

const TabsStyle: FC<TabsStyleProps> = ({ dashboardTab }) => {
  const t = useTranslations('Route');
  const { tabs, setTabs, setActiveKey } = useTabsStore(
    useShallow((s) => pick(s, ['tabs', 'setTabs', 'setActiveKey']))
  );
  const pathname = usePathname();

  // 配置传感器：只响应指针（鼠标/触摸）事件
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 激活拖拽所需的最小距离（以避免与按钮点击冲突）
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // 拖拽结束的处理函数
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // 找到拖拽项和目标项的索引
      const oldIndex = tabs.findIndex(tab => tab.path === active.id);
      const newIndex = tabs.findIndex(tab => tab.path === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // 使用 arrayMove 重新排序数组，并更新状态
        const newTabs = arrayMove(tabs, oldIndex, newIndex);
        setTabs(newTabs);
      }
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[({ transform }) => {
        return {
          ...transform,
          y: 0, // 强制将垂直方向 (Y轴) 的位移归零
        };
      }]}
    >
      <div className="flex items-center gap-1 min-w-max">
        <Tabs value={pathname} onValueChange={setActiveKey}>
          <TabsList>
            {/* 固定标签 */}
            {dashboardTab ? (
              <TabsTrigger value={dashboardTab.path} className="flex items-center justify-center gap-1 text-xs py-1.5">
                <DynamicIcon name={dashboardTab.icon} />
                <span>{t(dashboardTab.label)}</span>
                <Pin />
              </TabsTrigger>
            ) : null}
            {/* 可拖拽标签 */}
            {tabs.length > 0 && (
              <SortableContext
                items={tabs.map(tab => tab.path)}
                strategy={horizontalListSortingStrategy}
              >
                {tabs.map(tag => (
                  <SortableTabItem key={tag.path} tag={tag} />
                ))}
              </SortableContext>
            )}
          </TabsList>
        </Tabs>
      </div>
    </DndContext>
  )
}
export default TabsStyle;