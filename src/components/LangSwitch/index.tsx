/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 17:43:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 14:50:50
 * @Description: 国际化
 */
'use client';

import { Button, Dropdown, Label, type Selection } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import { setLocale } from '@/i18n';
import { LOCALES } from '@/lib/constant'

export default function LangSwitch() {
  const locale = useLocale();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([locale]));

  // 切换语言
  const onSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys)
    setLocale(locale === LOCALES.ZH ? LOCALES.EN : LOCALES.ZH);
  }
  return (
    <Dropdown>
      <Button isIconOnly aria-label="LangSwitch" variant="ghost">
        <Icon icon='ri:translate-2' className='text-lg' />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          disallowEmptySelection
          aria-label="Lang Selection"
          selectedKeys={selectedKeys}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          <Dropdown.Item id={LOCALES.ZH} textValue={LOCALES.ZH}>
            <Dropdown.ItemIndicator />
            <Icon className="text-muted size-4 shrink-0" icon="flag:cn-4x3" />
            <Label>简体中文</Label>
          </Dropdown.Item>
          <Dropdown.Item id={LOCALES.EN} textValue={LOCALES.EN}>
            <Dropdown.ItemIndicator />
            <Icon className="text-muted size-4 shrink-0" icon="flag:um-4x3" />
            <Label>English</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}