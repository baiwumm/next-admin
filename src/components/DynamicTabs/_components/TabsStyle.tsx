/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-25 15:36:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-25 17:35:26
 * @Description: HeroUI Tabs 风格
 */
import { Tab, Tabs } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { map } from "es-toolkit/compat";
import { useLinkStatus } from 'next/link';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

type TabsStyleProps = {
  tabs: App.SystemSettings.Menu[];
  activeKey: string;
  setActiveKey: (key: string) => void;
  removeTab: (key: string) => void;
  dashboardTab: App.SystemSettings.Menu | undefined;
}

const TabsStyle: FC<TabsStyleProps> = ({ tabs = [], activeKey, setActiveKey, removeTab, dashboardTab }) => {
  const t = useTranslations('Route');
  const { pending } = useLinkStatus();

  // 渲染标签子项
  const renderTab = ({ path, label, icon }: App.SystemSettings.Menu, canClose = true) => (
    <Tab
      key={path}
      title={
        <div className="flex items-center gap-1">
          <Icon icon={icon} className="text-base" />
          <span>{t(label)}</span>
          {canClose ? (
            <Icon
              icon="ri:close-line"
              className="cursor-pointer text-base"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(path);
              }}
            />
          ) : (
            <Icon icon='ri:pushpin-2-line' className="cursor-pointer text-base" />
          )}
        </div>
      }
    />
  );
  return (
    <Tabs
      size="sm"
      selectedKey={activeKey}
      onSelectionChange={(key) => setActiveKey(String(key))}
      color="primary"
      isDisabled={pending}
      classNames={{ tabList: 'p-0' }}
    >
      {dashboardTab && renderTab(dashboardTab, false)}
      {tabs.length > 0 && map(tabs, (menu) => renderTab(menu))}
    </Tabs>
  )
}
export default TabsStyle;