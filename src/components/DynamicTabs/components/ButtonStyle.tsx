/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-05 16:18:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-05 17:05:50
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
import { useLinkStatus } from 'next/link';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { useShallow } from "zustand/react/shallow";
import { pick } from '@/lib/utils';
import SortableButtonItem from './SortableButtonItem';

import { Button } from '@/components/ui';
import { useTabsStore } from "@/store/useTabsStore";

type ButtonStyleProps = {
  dashboardTab: System.Menu | undefined;
}

const ButtonStyle: FC<ButtonStyleProps> = ({ dashboardTab }) => {
  const t = useTranslations('Route');
  const { pending } = useLinkStatus();
  const { tabs, setTabs, activeKey, setActiveKey } = useTabsStore(
    useShallow((s) => pick(s, ['tabs', 'setTabs', 'activeKey', 'setActiveKey']))
  );

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
        {/* 固定标签 */}
        {dashboardTab ? (
          <div
            key={dashboardTab.path}
          >
            <Button
              variant={activeKey === dashboardTab.path ? 'default' : 'outline'}
              size='sm'
              disabled={pending}
              onClick={() => setActiveKey(dashboardTab.path)}
              className="gap-1 text-xs px-2"
            >
              <DynamicIcon name={dashboardTab.icon} />
              <span>{t(dashboardTab.label)}</span>
              <Pin />
            </Button>
          </div>
        ) : null}
        {/* 可拖拽标签 */}
        {tabs.length > 0 && (
          <SortableContext
            items={tabs.map(tab => tab.path)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex items-center">
              {tabs.map(tag => (
                <SortableButtonItem key={tag.path} tag={tag} />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </DndContext>
  )
}
export default ButtonStyle;