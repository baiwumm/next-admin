/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 11:31:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-30 15:28:56
 * @Description: 顶部搜索
 */
import { Button, Input, Spinner } from '@nextui-org/react';
import { RiAddLine, RiResetLeftLine, RiSearchLine } from '@remixicon/react';
import { SetState } from 'ahooks/es/useSetState';
import { useTranslations } from 'next-intl';

export type HeaderSearchProps = {
  loading: boolean;
  refresh: () => void;
  onOpen: VoidFunction;
  searchParams: App.SystemManage.UserSearchParams;
  setSearchParams: SetState<App.SystemManage.UserSearchParams>;
};

export default function HeaderSearch({
  loading = false,
  refresh,
  onOpen,
  searchParams,
  setSearchParams,
}: HeaderSearchProps) {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');

  // 表单重置
  const resetForm = () => {
    setSearchParams({
      userName: '',
      phone: '',
    });
    setTimeout(() => {
      refresh();
    });
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Input
        value={searchParams.userName}
        isClearable
        placeholder={`${tGlobal('enter')}${t('user-manage.userName')}`}
        className="w-[150px] lg:w-[250px]"
        size="sm"
        onValueChange={(value) => setSearchParams({ userName: value })}
      />
      <Input
        value={searchParams.phone}
        isClearable
        placeholder={`${tGlobal('enter')}${t('user-manage.phone')}`}
        className="w-[150px] lg:w-[250px]"
        size="sm"
        onValueChange={(value) => setSearchParams({ phone: value })}
      />
      <Button variant="ghost" size="sm" disabled={loading} onPress={refresh} className="border">
        {loading ? <Spinner size="sm" /> : <RiSearchLine size={18} />}
        {tGlobal('search')}
      </Button>
      <Button variant="ghost" size="sm" onPress={resetForm} className="border">
        <RiResetLeftLine size={18} />
        {tGlobal('reset')}
      </Button>
      <Button variant="ghost" size="sm" className="border border-dashed" onPress={onOpen}>
        <RiAddLine size={18} />
        {tGlobal('add')}
      </Button>
    </div>
  );
}
