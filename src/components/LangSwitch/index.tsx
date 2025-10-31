/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 17:43:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-31 09:17:53
 * @Description: 国际化
 */
'use client';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, type SharedSelection } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import { useState } from 'react';

import { setLocale } from '@/i18n';
import { type Locale, locales } from '@/i18n/config';

type LangSwitchProps = {
  locale: Locale;
}

export default function LangSwitch({ locale }: LangSwitchProps) {
  const [selectedKeys, setSelectedKeys] = useState<SharedSelection>(new Set([locale]));

  const [ZH, EN] = locales;

  // 切换语言
  const onSelectionChange = (keys: SharedSelection) => {
    setSelectedKeys(keys)
    setLocale(locale === ZH ? EN : ZH);
  }
  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button isIconOnly aria-label="LangSwitch" variant="light" radius="full">
          <Icon icon='ri:translate-2' className='text-lg' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Lang Selection"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={onSelectionChange}
      >
        <DropdownItem key="zh" startContent={<Icon icon='flag:cn-4x3' />}>简体中文</DropdownItem>
        <DropdownItem key="en" startContent={<Icon icon='flag:um-4x3' />}>English</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}