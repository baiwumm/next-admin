/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-25 16:04:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-25 18:00:24
 * @Description: 按钮风格
 */
import { Button } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { map } from "es-toolkit/compat";
import { AnimatePresence, motion } from "motion/react";
import { useLinkStatus } from 'next/link';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

type ButtonStyleProps = {
  tabs: App.SystemSettings.Menu[];
  activeKey: string;
  setActiveKey: (key: string) => void;
  removeTab: (key: string) => void;
  dashboardTab: App.SystemSettings.Menu | undefined;
}

const ButtonStyle: FC<ButtonStyleProps> = ({ tabs = [], activeKey, setActiveKey, removeTab, dashboardTab }) => {
  const t = useTranslations('Route');
  const { pending } = useLinkStatus();

  // 渲染按钮
  const renderButton = ({ path, label, icon }: App.SystemSettings.Menu, canClose = true) => (
    <motion.div
      key={path}
      layout // 启用布局动画（自动计算位置变化）
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, duration: .75 }}
    >
      <Button
        color={activeKey === path ? 'primary' : 'default'}
        variant={activeKey === path ? 'solid' : 'ghost'}
        size='sm'
        disabled={pending}
        startContent={<Icon icon={icon} className="text-base" />}
        endContent={canClose ? (
          <Icon
            icon='ri:close-line'
            className="text-base cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              removeTab(path);
            }} />
        ) : (
          <Icon icon='ri:pushpin-2-line' className="text-base" />
        )}
        onPress={() => setActiveKey(path)}
        className="gap-1"
      >
        {t(label)}
      </Button>
    </motion.div>
  )
  return (
    <AnimatePresence mode="popLayout">
      <div className="flex items-center gap-1 min-w-max">
        {dashboardTab && renderButton(dashboardTab, false)}
        {tabs.length > 0 && map(tabs, (menu) => renderButton(menu))}
      </div>
    </AnimatePresence>
  )
}
export default ButtonStyle;