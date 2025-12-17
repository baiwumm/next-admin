/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-12 15:41:54
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-17 17:26:34
 * @Description: 表单弹窗
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequest } from 'ahooks';
import { Check, CircleCheckBig, X } from 'lucide-react';
import { DynamicIcon, type IconName, iconNames } from 'lucide-react/dynamic';
import { useMessages, useTranslations } from 'next-intl';
import { type FC, Fragment, type ReactNode, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z } from "zod";

import {
  Alert,
  AlertIcon,
  AlertTitle,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputWrapper,
  NumberField,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Switch
} from '@/components/ui';
import { RESPONSE } from '@/enums';
import { addMenu, updateMenu } from '@/services/system-settings/menu-manage';

type FormDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  currentRow: System.Menu | null;
  setCurrentRow: (row: System.Menu | null) => void;
  refresh: VoidFunction;
  menuList: System.Menu[];
}

const FormDialog: FC<FormDialogProps> = ({ dialogOpen = false, setDialogOpen, currentRow, setCurrentRow, refresh, menuList = [] }) => {
  const t = useTranslations('Pages.MenuManage');
  const tC = useTranslations('Common');
  const tR = useTranslations('Route');
  const id = currentRow?.id || undefined;
  const messages = useMessages();

  // 新增保存接口
  const { run, loading } = useRequest(id ? updateMenu : addMenu, {
    manual: true,
    onSuccess: ({ code }) => {
      if (code === RESPONSE.SUCCESS) {
        form.reset();
        setCurrentRow(null);
        setDialogOpen(false);
        toast.custom(
          (t) => (
            <Alert variant="success" appearance="outline" onClose={() => toast.dismiss(t)}>
              <AlertIcon>
                <CircleCheckBig />
              </AlertIcon>
              <AlertTitle>{id ? tC('edit-success') : tC('add-success')}</AlertTitle>
            </Alert>
          )
        )
        refresh?.();
      }
    }
  })


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
  const LUCIDE_ICON_SET = new Set(iconNames);
  const formSchema = z.object({
    parent_id: z.string().min(1).nullable().optional(),
    label: z.string().min(1, tC('not-empty')),
    path: stringWithMaxLength('path').regex(/^\/[a-zA-Z0-9/_-]*[a-zA-Z0-9_-]$/, t('path-invalid')),
    icon: z.string().min(1, tC('not-empty')).refine(
      (val) => LUCIDE_ICON_SET.has(val as IconName),
      { message: t('icon-invalid') }
    ),
    redirect: z.string().nullable().optional(),
    sort: z.number(),
    show_in_menu: z.boolean()
  })

  // 创建表单实例
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parent_id: null,
      label: "",
      path: "",
      icon: "",
      redirect: null,
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
    setDialogOpen(open);
    if (!open) {
      form.reset();
      setCurrentRow(null);
    }
  };

  // 渲染父级下拉菜单
  const renderSelectMenus = (nodes: System.Menu[], level = 0): ReactNode => {
    return nodes.map(({ id, icon, label, children }) => (
      <Fragment key={id}>
        <SelectItem key={id} value={id}>
          <span className="flex items-center gap-2" style={{ paddingLeft: `${level * 12}px` }}>
            <DynamicIcon name={icon} className="size-4 opacity-60" />
            <span>{tR(label)}</span>
          </span>
        </SelectItem>
        {children?.length ? renderSelectMenus(children, level + 1) : null}
      </Fragment>
    ))
  }

  // 表单提交
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    run({ id, ...values })
  }

  useEffect(() => {
    if (dialogOpen && currentRow) {
      form.reset(currentRow, { keepDefaultValues: true });
    }
  }, [dialogOpen, currentRow, form])
  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange} >
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{id ? t('add') : t('edit')}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {/* 主体表单 */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="parent_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('parent_id')}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={tC('select')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {renderSelectMenus(menuList)}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>{t('parent_id_desc')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-red-500">*</span>
                    {t('label')}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={tC('select')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.keys(messages['Route']).map((value) => (
                            <SelectItem key={value} value={value}>{tR(value as System.Menu['label'])}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>{t('label-desc')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input placeholder={tC('enter')} {...field} value={field.value || undefined} />
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
                <Button variant="outline" onClick={() => form.reset()} disabled={loading}>{tC('cancel')}</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner variant='circle' /> : null}
                {tC('confirm')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default FormDialog;