/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-12 11:18:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-15 09:22:56
 * @Description: 顶部区域
 */
import { type Table } from '@tanstack/react-table';
import { Plus, Search, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import { type FC, useRef } from 'react';

import {
  Button,
  CardHeader,
  CardTitle,
  CardToolbar,
  DataGridColumnVisibility,
  Input,
  InputWrapper,
  Spinner
} from '@/components/ui';

type TopContentProps = {
  table: Table<System.Menu>;
  pathValue: string;
  setPathValue: (value: string) => void;
  loading: boolean;
  refresh: VoidFunction;
  setDialogOpen: (open: boolean) => void;
}

const TopContent: FC<TopContentProps> = ({ table, pathValue = '', setPathValue, loading = false, refresh, setDialogOpen }) => {
  const t = useTranslations('Pages.MenuManage');
  const tC = useTranslations('Common');
  const inputRef = useRef<HTMLInputElement>(null);

  // 清空输入框
  const handleClearInput = () => {
    setPathValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <CardHeader className="py-3">
      <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="w-60">
          <InputWrapper>
            <Input
              ref={inputRef}
              placeholder={tC('enter') + t('path')}
              value={pathValue}
              onChange={(e) => setPathValue(e.target.value)}
              maxLength={20}
            />
            <Button onClick={handleClearInput} variant="dim" className="-me-4" disabled={pathValue === ''}>
              {pathValue !== '' && <X size={16} />}
            </Button>
          </InputWrapper>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => refresh?.()} size='sm' variant="secondary">
            {loading ? <Spinner variant='circle' /> : <Search />}
            {tC('search')}
          </Button>
          <Button size='sm' onClick={() => setDialogOpen(true)}>
            <Plus />
            {tC('add')}
          </Button>
        </div>
      </CardTitle>
      <CardToolbar>
        <DataGridColumnVisibility table={table} />
      </CardToolbar>
    </CardHeader>
  )
}
export default TopContent;