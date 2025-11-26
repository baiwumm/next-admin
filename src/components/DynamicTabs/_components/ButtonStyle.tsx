/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-25 16:04:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-26 14:07:45
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
import { Button } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { map } from "es-toolkit/compat";
import { useLinkStatus } from 'next/link';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { useShallow } from "zustand/react/shallow";

import SortableButtonItem from './SortableButtonItem';

import { useTabsStore } from "@/store/useTabsStore";

type ButtonStyleProps = {
  dashboardTab: App.SystemSettings.Menu | undefined;
}

const ButtonStyle: FC<ButtonStyleProps> = ({ dashboardTab }) => {
  const t = useTranslations('Route');
  const { pending } = useLinkStatus();
  const { tabs, setTabs, activeKey, setActiveKey } = useTabsStore(
    useShallow((s) => ({
      tabs: s.tabs,
      setTabs: s.setTabs,
      activeKey: s.activeKey,
      setActiveKey: s.setActiveKey,
    }))
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
        {dashboardTab ? (
          <div
            key={dashboardTab.path}
          >
            <Button
              color={activeKey === dashboardTab.path ? 'primary' : 'default'}
              variant={activeKey === dashboardTab.path ? 'solid' : 'ghost'}
              size='sm'
              disabled={pending}
              startContent={<Icon icon={dashboardTab.icon} className="text-base" />}
              endContent={(
                <Icon icon='ri:pushpin-2-line' className="text-base" />
              )}
              onPress={() => setActiveKey(dashboardTab.path)}
              className="gap-1"
            >
              {t(dashboardTab.label)}
            </Button>
          </div>
        ) : null}
        {tabs.length > 0 && (
          <SortableContext
            items={tabs.map(tab => tab.path)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex items-center">
              {map(tabs, tag => (
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