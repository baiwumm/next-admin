/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-05 15:06:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-05 15:12:32
 * @Description: 头部搜索
 */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Form,
  Input,
} from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { useTranslations } from 'next-intl';
import { type FC, RefObject } from 'react';

type HeaderSearchProps = {
  searchRormRef: RefObject<HTMLFormElement | null>;
  hanldeSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  fetchMenuList: VoidFunction;
  loading: boolean;
  onOpen: VoidFunction;
  columns: App.Common.ColumnOption[];
  visibleColumns: Set<string>;
  setVisibleColumns: (keys: Set<string>) => void;
}

const HeaderSearch: FC<HeaderSearchProps> = ({
  searchRormRef,
  hanldeSearch,
  fetchMenuList,
  loading = false,
  onOpen,
  columns,
  visibleColumns,
  setVisibleColumns
}) => {
  const t = useTranslations('Common');
  const tM = useTranslations('Pages.MenuManage');
  return (
    <div className="flex items-center justify-between">
      <Form
        ref={searchRormRef}
        onSubmit={hanldeSearch}
        onReset={fetchMenuList}
        className="flex flex-row items-center gap-2"
      >
        <Input
          name="path"
          isClearable
          className="w-60"
          placeholder={t('enter') + tM('path')}
          size='sm'
        />
        <Button
          color='primary'
          size='sm'
          endContent={<Icon icon='ri:search-line' />}
          isLoading={loading}
          type='submit'
          variant="shadow">
          {t('search')}
        </Button>
        <Button
          size='sm'
          endContent={<Icon icon='ri:reset-right-line' />}
          isDisabled={loading}
          type='reset'
          variant="shadow">
          {t('reset')}
        </Button>
      </Form>
      <div className="flex gap-2 items-center">
        <Button
          color='success'
          size='sm'
          endContent={<Icon icon='ri:add-large-line' />}
          onPress={onOpen}
          variant="shadow">
          {t('add')}
        </Button>
        {/* 列设置 */}
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button endContent={<Icon icon='ri:arrow-down-s-line' className="text-small" />} variant="flat" size='sm'>
              {t('columns-settings')}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={(keys) => setVisibleColumns(keys as Set<string>)}
          >
            {columns.map((column) => (
              <DropdownItem key={column.uid} className="capitalize">
                {column.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
export default HeaderSearch;
