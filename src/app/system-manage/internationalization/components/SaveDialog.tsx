/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-12 17:22:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-13 14:23:14
 * @Description: 新增编辑弹窗
 */
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { formSchema } from './formSchema';

type SaveDialogProps = {
  open: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (value: z.infer<typeof formSchema>) => void;
  id: string;
  loading: boolean;
  handleCancel: VoidFunction;
};

export default function SaveDialog({
  open = false,
  form,
  onSubmit,
  id,
  loading = false,
  handleCancel,
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
                  <FormMessage />
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
                  <FormMessage />
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
