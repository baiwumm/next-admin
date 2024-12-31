/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 16:32:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-31 15:32:34
 * @Description: 新增编辑弹窗
 */
'use client';

import {
  Avatar,
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
import { RiCellphoneLine, RiEyeLine, RiEyeOffLine, RiMailLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import { SetState } from 'ahooks/es/useSetState';
import { omit, toNumber, toString } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { ChangeEventHandler, FormEvent, useState } from 'react';
import { toast } from 'sonner';

import ContentLoading from '@/components/ContentLoading';
import { SEX, STATUS } from '@/enums';
import { isSuccess } from '@/lib/utils';
import { addUser, updateUser } from '@/services/system-manage/user-manage';
import { uploadFile } from '@/services/upload';

type SaveModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  refresh: VoidFunction;
  onClose: VoidFunction;
  userId: string;
  formData: App.SystemManage.UserSaveParams;
  setFormData: SetState<App.SystemManage.UserSaveParams>;
  handleCancel: VoidFunction;
  avatar?: string;
  setAvatar: (avatar: string | undefined) => void;
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
  avatar,
  setAvatar,
}: SaveModalProps) {
  const t = useTranslations('Pages.user-manage');
  const tGlobal = useTranslations('Global');

  // 密码是否可见
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const togglePwdVisibility = () => setIsPwdVisible(!isPwdVisible);

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

  // 上传头像
  const { loading: uploadLoading, run: runUploadAvatar } = useRequest(uploadFile, {
    manual: true,
    onSuccess: ({ code, data }) => {
      if (isSuccess(code)) {
        setAvatar(data.url);
      }
    },
  });

  // 图片上传回调
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // 创建一个 FormData 对象
      const formData = new FormData();
      formData.append('file', file);
      runUploadAvatar(formData);
    }
  };

  // 表单提交
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { sort, ...data } = Object.fromEntries(new FormData(e.currentTarget));
    runSave({
      id: userId || undefined,
      ...omit(data, 'confirmPassword'),
      sort: toNumber(sort),
      avatar,
    } as App.SystemManage.UserSaveParams);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      onClose={handleCancel}
      backdrop="blur"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <Form validationBehavior="native" onSubmit={onSubmit}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`${userId ? tGlobal('edit') : tGlobal('add')}`}
                {t('title')}
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center flex-col gap-4">
                  <div className={`relative opacity-${uploadLoading ? '50' : '100'}`}>
                    <ContentLoading loading={uploadLoading} />
                    <Avatar className="w-28 h-28 text-large" src={avatar} />
                  </div>
                  <Input
                    name="avatar"
                    type="file"
                    accept="image/*"
                    className="w-20"
                    onChange={handleFileChange}
                    size="sm"
                  />
                </div>
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
                        isRequired
                        label={t('password')}
                        labelPlacement="outside"
                        placeholder={tGlobal('enter') + t('password')}
                        size="sm"
                        maxLength={32}
                        type={isPwdVisible ? 'password' : 'text'}
                        onValueChange={(value) => setFormData({ password: value })}
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={togglePwdVisibility}
                          >
                            {isPwdVisible ? (
                              <RiEyeLine size={16} className="text-default-400 pointer-events-none" />
                            ) : (
                              <RiEyeOffLine size={16} className="text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                      />
                      <Input
                        name="confirmPassword"
                        isRequired
                        label={t('confirmPassword')}
                        labelPlacement="outside"
                        placeholder={tGlobal('enter') + t('confirmPassword')}
                        size="sm"
                        maxLength={32}
                        type={isPwdVisible ? 'password' : 'text'}
                        validate={(value) => {
                          if (!value) {
                            return tGlobal('emptyField');
                          }
                          if (value !== formData.password) {
                            return t('validateConfirmPassword');
                          }
                          return null;
                        }}
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={togglePwdVisibility}
                          >
                            {isPwdVisible ? (
                              <RiEyeLine size={16} className="text-default-400 pointer-events-none" />
                            ) : (
                              <RiEyeOffLine size={16} className="text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
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
                <Button
                  color="primary"
                  type="submit"
                  isLoading={saveLoading}
                  disabled={saveLoading || uploadLoading}
                  size="sm"
                >
                  {tGlobal('submit')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  );
}
