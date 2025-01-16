/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 11:31:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-30 15:28:56
 * @Description: 顶部搜索
 */
import { Icon } from '@iconify/react';
import { Button, Input, Spinner } from '@nextui-org/react';
import { SetState } from 'ahooks/es/useSetState';
import { useTranslations } from 'next-intl';

export type HeaderSearchProps = {
  loading: boolean;
  refresh: () => void;
  searchParams: App.SystemManage.UserSearchParams;
  setSearchParams: SetState<App.SystemManage.UserSearchParams>;
};

export default function HeaderSearch({ loading = false, refresh, searchParams, setSearchParams }: HeaderSearchProps) {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');

  // 表单重置
  const resetForm = () => {
    setSearchParams({
      name: '',
      email: '',
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
        placeholder={`${tGlobal('enter')}${t('user-manage.title')}`}
        className="w-[150px] lg:w-[250px]"
        size="sm"
        onValueChange={(value) => setSearchParams({ name: value })}
      />
      <Input
        value={searchParams.email}
        isClearable
        placeholder={`${tGlobal('enter')}${t('user-manage.email')}`}
        className="w-[150px] lg:w-[250px]"
        size="sm"
        onValueChange={(value) => setSearchParams({ email: value })}
      />
      <Button variant="ghost" size="sm" disabled={loading} onPress={refresh} className="border">
        {loading ? <Spinner size="sm" /> : <Icon icon="ri:search-line" className="text-lg" />}
        {tGlobal('search')}
      </Button>
      <Button variant="ghost" size="sm" onPress={resetForm} className="border">
        <Icon icon="ri:reset-left-line" className="text-lg" />
        {tGlobal('reset')}
      </Button>
    </div>
  );
}
