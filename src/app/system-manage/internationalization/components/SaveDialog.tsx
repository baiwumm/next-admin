/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-12 17:22:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-17 14:09:49
 * @Description: 新增编辑弹窗
 */
import { map } from 'lodash-es';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Empty } from '@/components/ui/empty';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { formSchema } from './formSchema';

type SaveDialogProps = {
  open: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (value: z.infer<typeof formSchema>) => void;
  id: string;
  loading: boolean;
  handleCancel: VoidFunction;
  dataSource: App.SystemManage.Internalization[];
};

export default function SaveDialog({
  open = false,
  form,
  onSubmit,
  id,
  loading = false,
  handleCancel,
  dataSource = [],
}: SaveDialogProps) {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');

  const onOpenChange = (value: boolean) => {
    if (!value) {
      handleCancel();
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`${tGlobal(id ? 'edit' : 'add')}${t('internationalization.name')}`}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tGlobal('parent')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={tGlobal('select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataSource?.length ? (
                        <SelectGroup>
                          {map(dataSource, ({ id, name, children = [] }) => (
                            <Fragment key={id}>
                              <SelectItem value={id}>{name}</SelectItem>
                              {children.length
                                ? map(children, (child) => (
                                    <SelectItem key={child.id} value={child.id} className="indent-2.5">
                                      {child.zh || child.name}
                                    </SelectItem>
                                  ))
                                : null}
                            </Fragment>
                          ))}
                        </SelectGroup>
                      ) : (
                        <Empty />
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>{tGlobal('parentTip')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('internationalization.name')}</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={32}
                      placeholder={`${tGlobal('enter')}${t('internationalization.name')}`}
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
                  <FormLabel>{t('internationalization.zh')}</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={500}
                      placeholder={`${tGlobal('enter')}${t('internationalization.zh')}`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('internationalization.en')}</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={500}
                      placeholder={`${tGlobal('enter')}${t('internationalization.en')}`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="animate-spin" /> : null}
              {tGlobal('submit')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
