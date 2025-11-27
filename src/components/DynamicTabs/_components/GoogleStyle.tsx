/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-26 17:51:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-27 09:56:47
 * @Description: 谷歌风格标签页
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
import { Button, cn } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { map } from "es-toolkit/compat";
import { useLinkStatus } from 'next/link';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { useShallow } from "zustand/react/shallow";

import SortableGoogleItem from './SortableGoogleItem';

import { useTabsStore } from "@/store/useTabsStore";

type GoogleStyleProps = {
  dashboardTab: App.SystemSettings.Menu | undefined;
}

const GoogleStyle: FC<GoogleStyleProps> = ({ dashboardTab }) => {
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
  const isActive = activeKey === dashboardTab?.path;

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
      <div className="flex items-center gap-1 min-w-max px-5 overflow-y-hidden">
        {dashboardTab ? (
          <div
            key={dashboardTab.path}
          >
            <Button
              color={isActive ? 'primary' : 'default'}
              variant={isActive ? 'solid' : 'light'}
              size='sm'
              radius="lg"
              disabled={pending}
              startContent={<Icon icon={dashboardTab.icon} className="text-base" />}
              endContent={(
                <Icon icon='ri:pushpin-2-line' className="text-base" />
              )}
              onPress={() => setActiveKey(dashboardTab.path)}
              className={cn("gap-1 tab-google", isActive ? 'tabs-google-theme-active overflow-visible z-10 rounded-b-none' : '')}
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
                <SortableGoogleItem key={tag.path} tag={tag} />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </DndContext>
  )
}
export default GoogleStyle;
