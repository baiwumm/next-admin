/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 11:31:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-14 16:02:12
 * @Description: 顶部搜索
 */
import { parseDate } from '@internationalized/date';
import { Button, DateRangePicker, Input, Spinner } from '@nextui-org/react';
import { RiAddLine, RiResetLeftLine, RiSearchLine } from '@remixicon/react';
import { SetState } from 'ahooks/es/useSetState';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

export type HeaderSearchProps = {
  loading: boolean;
  refresh: () => void;
  searchParams: App.SystemManage.MenuSearchParams;
  setSearchParams: SetState<App.SystemManage.MenuSearchParams>;
  onOpen: VoidFunction;
};

export default function HeaderSearch({
  loading = false,
  refresh,
  searchParams,
  setSearchParams,
  onOpen,
}: HeaderSearchProps) {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');

  // 表单重置
  const resetForm = () => {
    setSearchParams({
      name: '',
      startTime: undefined,
      endTime: undefined,
    });
    setTimeout(() => {
      refresh();
    });
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Input
        value={searchParams.name}
        isClearable
        placeholder={`${tGlobal('enter')}${t('menu-manage.name')}`}
        className="w-[150px] lg:w-[250px]"
        size="sm"
        onValueChange={(value) => setSearchParams({ name: value })}
      />
      <DateRangePicker
        aria-label="Date Range Picker"
        value={{
          start: searchParams.startTime ? parseDate(dayjs(searchParams.startTime).format('YYYY-MM-DD')) : undefined,
          end: searchParams.endTime ? parseDate(dayjs(searchParams.endTime).format('YYYY-MM-DD')) : undefined,
        }}
        size="sm"
        className="w-[150px] lg:w-[250px]"
        visibleMonths={2}
        onChange={({ start, end }) => {
          if (start && end) {
            setSearchParams({
              startTime: dayjs(start).startOf('day').valueOf(),
              endTime: dayjs(end).endOf('day').valueOf(),
            });
          }
        }}
      />
      <Button variant="ghost" size="sm" disabled={loading} onPress={refresh} className="border">
        {loading ? <Spinner size="sm" /> : <RiSearchLine size={18} />}
        {tGlobal('search')}
      </Button>
      <Button variant="ghost" size="sm" onPress={resetForm} className="border">
        <RiResetLeftLine size={18} />
        {tGlobal('reset')}
      </Button>
      <Button variant="ghost" size="sm" onPress={onOpen} className="border">
        <RiAddLine size={18} />
        {tGlobal('add')}
      </Button>
    </div>
  );
}