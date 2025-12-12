/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-12 15:41:54
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-12 18:10:37
 * @Description: 表单弹窗
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputWrapper,
  NumberField,
  Switch
} from '@/components/ui';

type FormDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

const FormDialog: FC<FormDialogProps> = ({ dialogOpen = false, setDialogOpen }) => {
  const t = useTranslations('Pages.MenuManage');
  const tC = useTranslations('Common');
  // 最大字数限制
  const FIELD_MAX_LENGTHS = {
    label: 100,
    path: 200,
    icon: 50,
  } as const;

  // 字符串最大长度限制
  const stringWithMaxLength = (field: keyof typeof FIELD_MAX_LENGTHS) => {
    const max = FIELD_MAX_LENGTHS[field];
    return z.string()
      .min(1, tC('not-empty'))
      .max(max, tC('max-length', { max }));
  };

  // 字段验证规则
  const formSchema = z.object({
    label: stringWithMaxLength('label'),
    path: stringWithMaxLength('path'),
    icon: stringWithMaxLength('icon'),
    redirect: z.string(),
    sort: z.number(),
    show_in_menu: z.boolean()
  })

  // 创建表单实例
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      path: "",
      icon: "",
      redirect: '',
      sort: 1,
      show_in_menu: true
    },
  })

  // 渲染字符串表单
  const renderStringField = (fieldName: keyof typeof FIELD_MAX_LENGTHS) => {
    return (
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => {
          const currentLength = field.value?.length ?? 0;
          return (
            <FormItem>
              <FormLabel>
                <span className="text-red-500">*</span>
                {t(fieldName)}
              </FormLabel>
              <FormControl>
                <InputWrapper>
                  <Input placeholder={`${tC('enter')}${t(fieldName)}`} maxLength={FIELD_MAX_LENGTHS[fieldName]} {...field} />
                  <Button size="sm" variant="dim" className="-me-1">{currentLength}/{FIELD_MAX_LENGTHS[fieldName]}</Button>
                </InputWrapper>
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    )
  };

  // 关闭弹窗
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setDialogOpen(open);
  };

  // 表单提交
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增菜单</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {/* 主体表单 */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {renderStringField('label')}
            {renderStringField('path')}
            {renderStringField('icon')}
            <FormField
              control={form.control}
              name="redirect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('redirect')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={`${tC('enter')}${t('redirect')}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormLabel>
                        {tC('sort')}
                      </FormLabel>
                      <FormControl>
                        <NumberField
                          min={1}
                          max={100}
                          size="sm"
                          {...field}
                          onValueChange={(value) => field.onChange(Number(value))}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="show_in_menu"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormLabel>
                        {t('show_in_menu')}
                      </FormLabel>
                      <FormControl>
                        <Switch
                          thumbIcon={field.value ? <Check className="text-black" /> : <X className="text-black" />}
                          checked={field.value} onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => form.reset()}>{tC('cancel')}</Button>
              </DialogClose>
              <Button type="submit">{tC('confirm')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default FormDialog;