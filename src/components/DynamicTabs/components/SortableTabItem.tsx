/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-26 10:18:06
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-08 10:04:25
 * @Description: 标签页风格拖拽子项
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslations } from 'next-intl';
import { CSSProperties, type FC } from 'react';

import { TabsTrigger } from '@/components/ui';

type SortableItemProps = {
  tag: System.Menu;
}

const SortableTabItem: FC<SortableItemProps> = ({ tag }) => {
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

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    marginRight: '0.25rem',
  };
  return (
    <TabsTrigger
      ref={setNodeRef}
      value={tag.path}
      {...listeners}
      {...attributes}
      style={style}
      className="flex items-center justify-center gap-1 text-xs cursor-grab active:cursor-grabbing"
    >
      <DynamicIcon name={tag.icon} />
      <span>{t(tag.label)}</span>
      <X />
    </TabsTrigger>
  );
};

export default SortableTabItem;