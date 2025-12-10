/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-09 15:37:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-10 16:19:18
 * @Description: 面包屑
 */
'use client'
import { DynamicIcon } from 'lucide-react/dynamic';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC, Fragment } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, Card, CardContent } from "@/components/ui"
import { useMenuStore } from '@/store/useMenuStore';

// 包装 BreadcrumbItem 为 motion 组件
const MotionBreadcrumbItem = motion(BreadcrumbItem);
const MotionBreadcrumbSeparator = motion(BreadcrumbSeparator);

type BreadcrumbContainerProps = {
  hideOnSingleItem?: boolean; // 只有一级是否显示，默认不显示
}

const BreadcrumbContainer: FC<BreadcrumbContainerProps> = ({ hideOnSingleItem = true }) => {
  const t = useTranslations('Route');
  const pathname = usePathname();
  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);

  // 递归生成面包屑
  function findBreadcrumbs(pathname: string, menu: typeof menuList, breadcrumb: System.Menu[] = []): System.Menu[] | null {
    for (const item of menu) {
      if (item.path === pathname) {
        return [...breadcrumb, item]
      }

      if (item.children?.length > 0) {
        const result = findBreadcrumbs(pathname, item.children, [...breadcrumb, item])
        if (result) return result
      }
    }
    return null
  }

  // 生成面包屑路径
  const breadcrumbPath = findBreadcrumbs(pathname, menuList) || [];

  if (!breadcrumbPath.length) {
    return null;
  }
  if (breadcrumbPath.length === 1 && hideOnSingleItem) {
    return null
  }
  return (
    <Card className="py-0 rounded-md size-fit">
      <CardContent className="px-3 py-2">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center">
            <AnimatePresence mode="popLayout">
              {breadcrumbPath.map(({ id, label, icon }, index) => (
                <Fragment key={id}>
                  {/* 动画化的 BreadcrumbItem */}
                  <MotionBreadcrumbItem
                    className="flex items-center justify-center gap-2 text-xs text-accent-foreground"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }} // 逐个延迟
                    layout // 启用布局动画（更流畅）
                  >
                    <DynamicIcon name={icon} size={14} />
                    <span>{t(label)}</span>
                  </MotionBreadcrumbItem>

                  {/* 动画化的 Separator（如果不是最后一个） */}
                  {index !== breadcrumbPath.length - 1 && (
                    <MotionBreadcrumbSeparator
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      layout
                    />
                  )}
                </Fragment>
              ))}
            </AnimatePresence>
          </BreadcrumbList>
        </Breadcrumb>
      </CardContent>
    </Card>
  )
}
export default BreadcrumbContainer;