/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 16:32:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-27 17:52:21
 * @Description: 新增编辑弹窗
 */
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from '@nextui-org/react';
import { RiCellphoneLine, RiMailLine } from '@remixicon/react';
import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { SEX, STATUS } from '@/enums';
import { isSuccess } from '@/lib/utils';

import { formSchema } from './formSchema';

type SaveModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  saveLoading: boolean;
  runSave: (params: App.SystemManage.UserSaveParams) => Promise<App.Common.IResponse<App.SystemManage.User>>;
  refresh: VoidFunction;
  onClose: VoidFunction;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  userId: string;
  setUserId: (id: string) => void;
};

export default function SaveModal({
  isOpen = false,
  onOpenChange,
  saveLoading = false,
  runSave,
  refresh,
  onClose,
  form,
  userId,
  setUserId,
}: SaveModalProps) {
  const t = useTranslations('Pages.user-manage');
  const tGlobal = useTranslations('Global');

  // 退出弹窗回调
  const handleCancel = () => {
    form.reset();
    setUserId('');
  };
  // 表单提交
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(111);
    const params: App.SystemManage.UserSaveParams = {
      id: userId || undefined,
      ...values,
      password: '123456',
    };
    console.log(params);
    // await runSave(params).then(({ code, msg }) => {
    //   if (isSuccess(code)) {
    //     toast.success(msg);
    //     onClose();
    //     handleCancel();
    //     refresh();
    //   }
    // })
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" onClose={handleCancel}>
      <Form {...form}>
        <form className="w-full max-w-xs" onSubmit={form.handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {`${userId ? tGlobal('edit') : tGlobal('add')}`}
                  {t('title')}
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isClearable
                              isRequired
                              label={t('userName')}
                              labelPlacement="outside"
                              placeholder={tGlobal('enter') + t('userName')}
                              size="sm"
                              maxLength={32}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cnName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isClearable
                              isRequired
                              label={t('cnName')}
                              labelPlacement="outside"
                              placeholder={tGlobal('enter') + t('cnName')}
                              size="sm"
                              maxLength={12}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isClearable
                              isRequired
                              label={t('email')}
                              errorMessage={({ validationDetails, validationErrors }) => {
                                if (validationDetails.typeMismatch) {
                                  return t('emailError');
                                }

                                return validationErrors;
                              }}
                              startContent={
                                <RiMailLine size={18} className="text-default-400 pointer-events-none flex-shrink-0" />
                              }
                              labelPlacement="outside"
                              placeholder={tGlobal('enter') + t('email')}
                              type="email"
                              size="sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isClearable
                              isRequired
                              label={t('phone')}
                              labelPlacement="outside"
                              startContent={
                                <RiCellphoneLine
                                  size={18}
                                  className="text-default-400 pointer-events-none flex-shrink-0"
                                />
                              }
                              placeholder={tGlobal('enter') + t('phone')}
                              type="tel"
                              size="sm"
                              validate={(value) => {
                                if (!value) {
                                  return tGlobal('emptyField');
                                }
                                if (!/^[1-9]\d{10}$/.test(value)) {
                                  return t('phoneError');
                                }
                                return null;
                              }}
                              maxLength={11}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup isRequired label={t('sex')} orientation="horizontal" size="sm" {...field}>
                              <Radio value={SEX.MALE}>{tGlobal('man')}</Radio>
                              <Radio value={SEX.FEMALE}>{tGlobal('women')}</Radio>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              isRequired
                              label={tGlobal('status')}
                              orientation="horizontal"
                              size="sm"
                              {...field}
                            >
                              <Radio value={STATUS.ACTIVE}>{tGlobal('statusActive')}</Radio>
                              <Radio value={STATUS.INACTIVE}>{tGlobal('statusInactive')}</Radio>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sort"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isRequired
                              errorMessage={tGlobal('enter') + tGlobal('sort')}
                              label={tGlobal('sort')}
                              labelPlacement="outside"
                              size="sm"
                              type="number"
                              min={1}
                              max={99}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" isLoading={saveLoading} size="sm">
                    {tGlobal('submit')}
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose} size="sm">
                    {tGlobal('close')}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Form>
    </Modal>
  );
}
