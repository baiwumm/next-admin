/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-04 09:23:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-21 16:54:14
 * @Description: 新增编辑弹窗
 */
import { addToast, Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NumberInput, Select, SelectItem, type SelectProps } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { useRequest } from 'ahooks'
import { isNil, pickBy } from 'es-toolkit'
import { useTranslations } from 'next-intl';
import { type FC, type FormEvent, RefObject, useEffect } from "react";

import { isSuccess } from '@/lib/utils';
import { addMenu, updateMenu } from '@/services/system-settings/menu-manage';

type SaveModalProps = {
  open: boolean;
  onOpenChange: VoidFunction;
  id: string;
  fetchMenuList: VoidFunction;
  formRef: RefObject<HTMLFormElement | null>;
  currentRow: App.SystemSettings.Menu | null;
  handleClose: VoidFunction;
  menuList: App.SystemSettings.Menu[];
}

const SaveModal: FC<SaveModalProps> = ({
  open = false,
  id,
  fetchMenuList,
  formRef,
  onOpenChange,
  currentRow,
  handleClose,
  menuList = []
}) => {
  const t = useTranslations('Common');
  const tM = useTranslations('Pages.MenuManage');
  const tR = useTranslations('Route');
  // 保存接口
  const { loading: saveLoading, run: runSave } = useRequest(id ? updateMenu : addMenu, {
    manual: true,
    onSuccess: ({ code }) => {
      if (isSuccess(code)) {
        addToast({
          title: id ? t('edit-success') : t('add-success'),
          color: 'success',
        })
        handleClose();
        fetchMenuList?.();
      }
    }
  });

  // 渲染父级下拉框
  const renderSelectMenus = (
    nodes: App.SystemSettings.Menu[],
    level = 0
  ): NonNullable<SelectProps<object>['children']> => {
    return nodes.map((node) => (
      <>
        <SelectItem
          key={node.id}
          startContent={<Icon icon={node.icon || 'ri:menu-line'} />}
          style={{ paddingLeft: `${level * 20}px` }}
          aria-label={node.path}
        >
          {tR(node.label)}
        </SelectItem>
        {node.children?.length ? renderSelectMenus(node.children, level + 1) : null}
      </>
    ))
  }

  // 表单提交
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // 过滤掉值为 null, undefined, 或空字符串的字段
    const params = pickBy({ ...data, id }, value => !isNil(value) && value !== '') as unknown as App.SystemSettings.MenuSaveParams;
    runSave(params)
  };

  // 当弹窗打开并且 row 数据更新时，填充表单
  useEffect(() => {
    if (open && currentRow && formRef.current) {
      Object.entries(currentRow).forEach(([key, value]) => {
        const el = formRef.current!.elements.namedItem(key)
        if (!el) return

        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          el.value = String(value ?? '')
        } else if (el instanceof HTMLSelectElement) {
          el.value = String(value ?? '')
        }
      })
    }
  }, [open, currentRow, formRef]); // 依赖 open 和 currentRow，确保每次弹窗打开并且数据改变时更新表单
  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      backdrop='blur'
      onClose={handleClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      classNames={{ wrapper: 'z-999', backdrop: "z-998" }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{id ? tM('edit') : tM('add')}</ModalHeader>
            <ModalBody>
              <Form ref={formRef} onSubmit={onSubmit}>
                <Select
                  name="parent_id"
                  label={t('parent')}
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder={t('select')}
                  startContent={<Icon icon='ri:menu-line' />}
                  description={t('parent-tip')}
                >
                  {renderSelectMenus(menuList)}
                </Select>
                <Input
                  isRequired
                  name="label"
                  label={tM('label')}
                  placeholder={t('enter')}
                  variant="bordered"
                  isClearable
                  labelPlacement="outside"
                />
                <Input
                  name="desc"
                  label={tM('desc')}
                  placeholder={t('enter')}
                  variant="bordered"
                  isClearable
                  labelPlacement="outside"
                />
                <Input
                  isRequired
                  name="path"
                  label={tM('path')}
                  placeholder={t('enter')}
                  variant="bordered"
                  isClearable
                  labelPlacement="outside"
                />
                <Input
                  isRequired
                  name="icon"
                  label={tM('icon')}
                  placeholder={t('enter')}
                  variant="bordered"
                  isClearable
                  labelPlacement="outside"
                />
                <Input
                  name="redirect"
                  label={tM('redirect')}
                  placeholder={t('enter')}
                  variant="bordered"
                  isClearable
                  labelPlacement="outside"
                />
                <NumberInput
                  isRequired
                  name="sort"
                  label={t('sort')}
                  variant="bordered"
                  labelPlacement="outside"
                  defaultValue={1}
                  minValue={1}
                  maxValue={999}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={handleClose}>
                {t('cancel')}
              </Button>
              <Button color="primary" onPress={() => formRef.current?.requestSubmit()} isLoading={saveLoading}>
                {t('confirm')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export default SaveModal;

