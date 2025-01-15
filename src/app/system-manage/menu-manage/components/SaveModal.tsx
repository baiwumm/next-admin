/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-14 14:52:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-15 09:42:37
 * @Description: 新增编辑弹窗
 */
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useRequest } from 'ahooks';
import { SetState } from 'ahooks/es/useSetState';
import { useTranslations } from 'next-intl';
import { FormEvent } from 'react';
import { toast } from 'sonner';

import { isSuccess } from '@/lib/utils';
import { addMenu, updateMenu } from '@/services/system-manage/menu-manage';

type SaveModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  refresh: VoidFunction;
  onClose: VoidFunction;
  menuId: string;
  formData: App.SystemManage.MenuSaveParams;
  setFormData: SetState<App.SystemManage.MenuSaveParams>;
  handleCancel: VoidFunction;
  menuList: App.SystemManage.Menu[];
};
export default function SaveModal({
  isOpen = false,
  onOpenChange,
  refresh,
  onClose,
  menuId,
  formData,
  setFormData,
  handleCancel,
  menuList = [],
}: SaveModalProps) {
  const t = useTranslations('Pages.menu-manage');
  const tGlobal = useTranslations('Global');
  const tRoute = useTranslations('Route');

  // 新增/编辑曹丹
  const { loading: saveLoading, run: runSave } = useRequest(menuId ? updateMenu : addMenu, {
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
    const { sort, parentId, ...data } = Object.fromEntries(new FormData(e.currentTarget));
    const params = {
      id: menuId || undefined,
      ...data,
      parentId: parentId || undefined,
      sort: Number(sort),
    };
    runSave(params as App.SystemManage.MenuSaveParams);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      onClose={handleCancel}
      backdrop="blur"
      isDismissable={false}
      isKeyboardDismissDisabled
    >
      <Form validationBehavior="native" onSubmit={onSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`${menuId ? tGlobal('edit') : tGlobal('add')}`}
                {t('title')}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    name="parentId"
                    label={tGlobal('parent')}
                    labelPlacement="outside"
                    description={tGlobal('parentTip')}
                    placeholder={tGlobal('select') + tGlobal('parent')}
                    size="sm"
                    selectedKeys={formData.parentId ? [formData.parentId] : undefined}
                    onChange={(e) => setFormData({ parentId: e.target.value })}
                    aria-label="parentId"
                  >
                    {menuList.map((menu) => (
                      <SelectItem key={menu.id}>{tRoute(menu.name)}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    value={formData.name}
                    name="name"
                    isClearable
                    isRequired
                    label={t('name')}
                    labelPlacement="outside"
                    placeholder={tGlobal('enter') + t('name')}
                    size="sm"
                    maxLength={32}
                    description={t('nameTip')}
                    onValueChange={(value) => setFormData({ name: value })}
                  />
                  <Input
                    value={formData.path}
                    name="path"
                    isClearable
                    isRequired
                    label={t('path')}
                    labelPlacement="outside"
                    placeholder={tGlobal('enter') + t('path')}
                    size="sm"
                    maxLength={200}
                    onValueChange={(value) => setFormData({ path: value })}
                  />
                  <Input
                    value={formData.icon}
                    name="icon"
                    isClearable
                    isRequired
                    label={t('icon')}
                    labelPlacement="outside"
                    placeholder={tGlobal('enter') + t('icon')}
                    size="sm"
                    maxLength={200}
                    onValueChange={(value) => setFormData({ icon: value })}
                  />
                  <Input
                    value={formData.redirect || ''}
                    name="redirect"
                    isClearable
                    label={t('redirect')}
                    labelPlacement="outside"
                    placeholder={tGlobal('enter') + t('redirect')}
                    size="sm"
                    maxLength={200}
                    onValueChange={(value) => setFormData({ redirect: value })}
                  />
                  <Input
                    value={String(formData.sort)}
                    name="sort"
                    isRequired
                    errorMessage={tGlobal('enter') + tGlobal('sort')}
                    label={tGlobal('sort')}
                    labelPlacement="outside"
                    size="sm"
                    type="number"
                    min={1}
                    max={99}
                    onValueChange={(value) => setFormData({ sort: Number(value) })}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" isLoading={saveLoading} size="sm">
                  {tGlobal('submit')}
                </Button>
                <Button color="danger" variant="light" onPress={onClose} isDisabled={saveLoading} size="sm">
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
