/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-26 18:01:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-27 09:42:41
 * @Description: 谷歌风格拖拽子项
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, cn } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { useLinkStatus } from 'next/link';
import { useTranslations } from 'next-intl';
import { CSSProperties, type FC, useRef } from 'react';
import { useShallow } from "zustand/react/shallow";

import { useTabsStore } from "@/store/useTabsStore";

type SortableGoogleItemProps = {
  tag: App.SystemSettings.Menu;
}

const SortableGoogleItem: FC<SortableGoogleItemProps> = ({ tag }) => {
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: tag.path,
  });

  const t = useTranslations('Route');
  const { pending } = useLinkStatus();
  const { activeKey, setActiveKey, removeTab } = useTabsStore(
    useShallow((s) => ({
      activeKey: s.activeKey,
      setActiveKey: s.setActiveKey,
      removeTab: s.removeTab,
    }))
  );
  const isActive = activeKey === tag.path;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform ? { ...transform, scaleX: 1 } : transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    marginRight: '0.25rem',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="min-w-max"
    >
      <Button
        color={isActive ? 'primary' : 'default'}
        variant={isActive ? 'solid' : 'light'}
        size='sm'
        radius="lg"
        disabled={pending}
        onPress={() => setActiveKey(tag.path)}
        className={cn("tab-google", isActive ? 'tabs-google-theme-active overflow-visible z-10 rounded-b-none' : '')}
      >
        <div ref={dragHandleRef} {...listeners} {...attributes} className="flex items-center gap-1 text-base cursor-grab active:cursor-grabbing">
          <Icon icon={tag.icon} />
          <span className="text-tiny">{t(tag.label)}</span>
          <Icon
            icon='ri:close-line'
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              removeTab(tag.path);
            }}
          />
        </div>
      </Button>
    </div>
  );
};

export default SortableGoogleItem;