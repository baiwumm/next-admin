/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 11:31:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-27 17:34:40
 * @Description: 顶部搜索
 */
import { Spinner } from '@nextui-org/react';
import { RiAddLine, RiResetLeftLine, RiSearchLine } from '@remixicon/react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { searchFormSchema } from './formSchema';

export type HeaderSearchProps = {
  loading: boolean;
  refresh: (params?: App.SystemManage.UserSearchParams) => void;
  form: UseFormReturn<z.infer<typeof searchFormSchema>>;
  onOpen: VoidFunction;
};

export default function HeaderSearch({ loading = false, refresh, form, onOpen }: HeaderSearchProps) {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');

  // 表单提交
  const onSubmit = (values: z.infer<typeof searchFormSchema>) => {
    refresh(values);
  };

  // 表单重置
  const resetForm = () => {
    form.reset();
    refresh();
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center flex-wrap">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={`${tGlobal('enter')}${t('user-manage.userName')}`}
                    className="h-8 w-[150px] lg:w-[250px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" size="sm" disabled={loading} type="submit">
            {loading ? <Spinner size="sm" /> : <RiSearchLine />}
            {tGlobal('search')}
          </Button>
        </form>
      </Form>
      <Button variant="outline" size="sm" onClick={resetForm}>
        <RiResetLeftLine />
        {tGlobal('reset')}
      </Button>
      <Button variant="outline" size="sm" className="border-dashed" onClick={onOpen}>
        <RiAddLine />
        {tGlobal('add')}
      </Button>
    </div>
  );
}
