/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 16:32:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-30 15:23:27
 * @Description: 新增编辑弹窗
 */
'use client';

import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from '@nextui-org/react';
import { type Sex, type Status } from '@prisma/client';
import { RiCellphoneLine, RiMailLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import { SetState } from 'ahooks/es/useSetState';
import { omit, toNumber, toString } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { FormEvent } from 'react';
import { toast } from 'sonner';

import { SEX, STATUS } from '@/enums';
import { isSuccess } from '@/lib/utils';
import { addUser, updateUser } from '@/services/system-manage/user-manage';

type SaveModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  refresh: VoidFunction;
  onClose: VoidFunction;
  userId: string;
  formData: App.SystemManage.UserSaveParams;
  setFormData: SetState<App.SystemManage.UserSaveParams>;
  handleCancel: VoidFunction;
};

export default function SaveModal({
  isOpen = false,
  onOpenChange,
  refresh,
  onClose,
  userId,
  formData,
  setFormData,
  handleCancel,
}: SaveModalProps) {
  const t = useTranslations('Pages.user-manage');
  const tGlobal = useTranslations('Global');

  // 新增/编辑用户
  const { loading: saveLoading, run: runSave } = useRequest(userId ? updateUser : addUser, {
    manual: true,
    onSuccess: ({ code, msg }) => {
      if (isSuccess(code)) {
        toast.success(msg);
        onClose();
        handleCancel();
        refresh();
      }
    },
  });

  // 表单提交
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { sort, ...data } = Object.fromEntries(new FormData(e.currentTarget));
    runSave({
      id: userId || undefined,
      ...omit(data, 'confirmPassword'),
      sort: toNumber(sort),
    } as App.SystemManage.UserSaveParams);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" onClose={handleCancel} backdrop="blur">
      <Form validationBehavior="native" onSubmit={onSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`${userId ? tGlobal('edit') : tGlobal('add')}`}
                {t('title')}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    value={formData.userName}
                    name="userName"
                    isClearable
                    isRequired
                    label={t('userName')}
                    labelPlacement="outside"
                    placeholder={tGlobal('enter') + t('userName')}
                    size="sm"
                    maxLength={32}
                    onValueChange={(value) => setFormData({ userName: value })}
                  />
                  <Input
                    value={formData.cnName}
                    name="cnName"
                    isClearable
                    isRequired
                    label={t('cnName')}
                    labelPlacement="outside"
                    placeholder={tGlobal('enter') + t('cnName')}
                    size="sm"
                    maxLength={12}
                    onValueChange={(value) => setFormData({ cnName: value })}
                  />
                  <Input
                    value={formData.email}
                    name="email"
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
                    onValueChange={(value) => setFormData({ email: value })}
                  />
                  <Input
                    value={formData.phone}
                    name="phone"
                    isClearable
                    isRequired
                    label={t('phone')}
                    labelPlacement="outside"
                    startContent={
                      <RiCellphoneLine size={18} className="text-default-400 pointer-events-none flex-shrink-0" />
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
                    onValueChange={(value) => setFormData({ phone: value })}
                  />
                  <RadioGroup
                    value={formData.sex}
                    name="sex"
                    isRequired
                    label={t('sex')}
                    orientation="horizontal"
                    size="sm"
                    onValueChange={(value) => setFormData({ sex: value as Sex })}
                  >
                    <Radio value={SEX.MALE}>{tGlobal('man')}</Radio>
                    <Radio value={SEX.FEMALE}>{tGlobal('women')}</Radio>
                  </RadioGroup>
                  <RadioGroup
                    value={formData.status}
                    name="status"
                    isRequired
                    label={tGlobal('status')}
                    orientation="horizontal"
                    size="sm"
                    onValueChange={(value) => setFormData({ status: value as Status })}
                  >
                    <Radio value={STATUS.ACTIVE}>{tGlobal('statusActive')}</Radio>
                    <Radio value={STATUS.INACTIVE}>{tGlobal('statusInactive')}</Radio>
                  </RadioGroup>
                  {userId ? null : (
                    <>
                      <Input
                        value={formData.password}
                        name="password"
                        isClearable
                        isRequired
                        label={t('password')}
                        labelPlacement="outside"
                        placeholder={tGlobal('enter') + t('password')}
                        size="sm"
                        maxLength={32}
                        type="password"
                        onValueChange={(value) => setFormData({ password: value })}
                      />
                      <Input
                        name="confirmPassword"
                        isClearable
                        isRequired
                        label={t('confirmPassword')}
                        labelPlacement="outside"
                        placeholder={tGlobal('enter') + t('confirmPassword')}
                        size="sm"
                        maxLength={32}
                        type="password"
                        validate={(value) => {
                          if (!value) {
                            return tGlobal('emptyField');
                          }
                          if (value !== formData.password) {
                            return t('validateConfirmPassword');
                          }
                          return null;
                        }}
                      />
                    </>
                  )}
                  <Input
                    value={toString(formData.sort)}
                    name="sort"
                    isRequired
                    errorMessage={tGlobal('enter') + tGlobal('sort')}
                    label={tGlobal('sort')}
                    labelPlacement="outside"
                    size="sm"
                    type="number"
                    min={1}
                    max={99}
                    onValueChange={(value) => setFormData({ sort: toNumber(value) })}
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
      </Form>
    </Modal>
  );
}
