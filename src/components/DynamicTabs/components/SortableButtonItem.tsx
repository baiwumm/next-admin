/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-26 10:18:06
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-05 17:05:41
 * @Description: 按钮风格拖拽子项
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useLinkStatus } from 'next/link';
import { useTranslations } from 'next-intl';
import { CSSProperties, type FC, useRef } from 'react';
import { useShallow } from "zustand/react/shallow";

import { Button } from '@/components/ui';
import { useTabsStore } from "@/store/useTabsStore";

type SortableItemProps = {
  tag: System.Menu;
}

const SortableButtonItem: FC<SortableItemProps> = ({ tag }) => {
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
        variant={activeKey === tag.path ? 'default' : 'outline'}
        size='sm'
        disabled={pending}
        onClick={() => setActiveKey(tag.path)}
        className="text-xs px-2"
      >
        <div className="flex items-center gap-0.5">
          <div ref={dragHandleRef} {...listeners} {...attributes} className="flex items-center gap-0.5 cursor-grab active:cursor-grabbing">
            <DynamicIcon name={tag.icon} />
            <span>{t(tag.label)}</span>
          </div>
          <div
            className="rounded-full p-0.5 hover:bg-foreground/10 focus-visible:ring-1 focus-visible:ring-ring transition-colors duration-150"
            onClick={(e) => {
              e.stopPropagation();
              removeTab(tag.path);
            }}>
            <X
            />
          </div>
        </div>
      </Button>
    </div>
  );
};

export default SortableButtonItem;