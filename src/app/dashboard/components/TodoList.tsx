'use client';

import { GripVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import EmptyContent from '@/components/EmptyContent';
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from '@/components/ui';
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from '@/components/ui/kanban';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  description?: string;
  assignee?: string;
  assigneeAvatar?: string;
  dueDate?: string;
}

type Column = 'backlog' | 'progress' | 'done';

interface TaskCardProps extends Omit<React.ComponentProps<typeof KanbanItem>, 'value' | 'children'> {
  task: Task;
  asHandle?: boolean;
}

function TaskCard({ task, asHandle, ...props }: TaskCardProps) {
  const t = useTranslations('Pages.Dashboard');
  const cardContent = (
    <div className="rounded-md border bg-card p-3 shadow-xs">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-1 font-medium text-sm">{task.title}</span>
          <Badge
            variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'primary' : 'warning'}
            appearance="light"
            className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize shrink-0"
          >
            {t(task.priority)}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          {task.assignee && (
            <div className="flex items-center gap-1">
              <Avatar className="size-4">
                <AvatarImage src={task.assigneeAvatar} />
                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="line-clamp-1">{task.assignee}</span>
            </div>
          )}
          {task.dueDate && <time className="text-[10px] tabular-nums whitespace-nowrap">{task.dueDate}</time>}
        </div>
      </div>
    </div>
  );

  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle ? <KanbanItemHandle>{cardContent}</KanbanItemHandle> : cardContent}
    </KanbanItem>
  );
}

interface TaskColumnProps extends Omit<React.ComponentProps<typeof KanbanColumn>, 'children'> {
  tasks: Task[];
  isOverlay?: boolean;
}

function TaskColumn({ value, tasks, isOverlay, ...props }: TaskColumnProps) {
  const t = useTranslations('Pages.Dashboard');
  return (
    <KanbanColumn value={value} {...props} className="rounded-md border bg-card p-2.5 shadow-xs">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-sm">{t(value as Column)}</span>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
        <KanbanColumnHandle asChild>
          <Button variant="dim" size="sm" mode="icon">
            <GripVertical />
          </Button>
        </KanbanColumnHandle>
      </div>
      <KanbanColumnContent value={value} className="flex flex-col gap-2.5 p-0.5">
        {tasks?.length ? tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle={!isOverlay} />
        )) : (
          <EmptyContent />
        )}
      </KanbanColumnContent>
    </KanbanColumn>
  );
}

export default function TodoList() {
  const t = useTranslations('Pages.Dashboard.tasks');
  const [columns, setColumns] = useState<Record<Column, Task[]>>({
    backlog: [
      {
        id: '1',
        title: t('add_auth'),
        priority: 'high',
        assignee: 'John Doe',
        assigneeAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        dueDate: 'Jan 10, 2025',
      },
      {
        id: '2',
        title: t('create_api'),
        priority: 'medium',
        assignee: 'Jane Smith',
        assigneeAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        dueDate: 'Jan 15, 2025',
      },
      {
        id: '3',
        title: t('write_docs'),
        priority: 'low',
        assignee: 'Bob Johnson',
        assigneeAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        dueDate: 'Jan 20, 2025',
      },
    ],
    progress: [
      {
        id: '4',
        title: t('design_system'),
        priority: 'high',
        assignee: 'Alice Brown',
        assigneeAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        dueDate: 'Aug 25, 2025',
      },
      {
        id: '5',
        title: t('dark_mode'),
        priority: 'medium',
        assignee: 'Charlie Wilson',
        assigneeAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        dueDate: 'Aug 25, 2025',
      },
    ],
    done: [
      {
        id: '7',
        title: t('setup_project'),
        priority: 'high',
        assignee: 'Eve Davis',
        assigneeAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        dueDate: 'Sep 25, 2025',
      },
      {
        id: '8',
        title: t('initial_commit'),
        priority: 'low',
        assignee: 'Frank White',
        assigneeAvatar: 'https://randomuser.me/api/portraits/men/7.jpg',
        dueDate: 'Sep 20, 2025',
      },
    ],
  });

  return (
    <Kanban value={columns} onValueChange={setColumns} getItemValue={(item) => item.id}>
      <KanbanBoard className="grid auto-rows-fr grid-cols-1 md:grid-cols-3">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
        ))}
      </KanbanBoard>
      <KanbanOverlay>
        <div className="rounded-md bg-muted/60 size-full" />
      </KanbanOverlay>
    </Kanban>
  );
}
