/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-11 17:52:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-12 11:00:30
 * @Description: 头部搜索
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { RotateCcw, Search } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type HeaderSearchProps = {
  loading: boolean;
  refresh: (params?: App.SystemManage.InternalizationSearchParams) => void;
};

export default function HeaderSearch({ loading = false, refresh }: HeaderSearchProps) {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');

  const formSchema = z.object({
    name: z.string().optional(),
    zh: z.string().optional(),
  });

  // 创建表单实例
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      zh: '',
    },
  });

  // 表单提交
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    refresh(values);
  };

  // 表单重置
  const resetForm = () => {
    form.reset();
    refresh();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center flex-wrap">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={`${tGlobal('enter')}${t('internationalization.name')}`}
                  className="h-8 w-[150px] lg:w-[250px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zh"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={`${tGlobal('enter')}${t('internationalization.zh')}`}
                  className="h-8 w-[150px] lg:w-[250px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" size="sm" disabled={loading} type="submit">
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
          {tGlobal('search')}
        </Button>
      </form>
      <Button variant="outline" size="sm" onClick={resetForm}>
        <RotateCcw />
        {tGlobal('reset')}
      </Button>
    </Form>
  );
}
