import { useRequest } from 'ahooks';
import { CircleCheckBig, Trash2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { toast } from 'sonner';

import {
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertIcon,
  AlertTitle,
  Button,
  Spinner
} from "@/components/ui";
import { RESPONSE } from '@/enums';
import { delMenu } from '@/services/system-settings/menu-manage';

type DeleteAlertDialogProps = {
  delDialogOpen: boolean;
  setDelDialogOpen: (open: boolean) => void;
  currentRow: System.Menu | null;
  setCurrentRow: (row: System.Menu | null) => void;
  refresh: VoidFunction;
}

const DeleteAlertDialog: FC<DeleteAlertDialogProps> = ({ delDialogOpen = false, setDelDialogOpen, currentRow, setCurrentRow, refresh }) => {
  const t = useTranslations('Common');

  // 删除菜单
  const { run, loading } = useRequest(delMenu, {
    manual: true,
    onSuccess: ({ code }) => {
      if (code === RESPONSE.SUCCESS) {
        toast.custom(
          (id) => (
            <Alert variant="success" appearance="outline" onClose={() => toast.dismiss(id)}>
              <AlertIcon>
                <CircleCheckBig />
              </AlertIcon>
              <AlertTitle>{t('delete-success')}</AlertTitle>
            </Alert>
          )
        )
        setCurrentRow(null);
        setDelDialogOpen(false);
        refresh?.();
      }
    }
  })

  // 关闭弹窗
  const handleOpenChange = (open: boolean) => {
    setDelDialogOpen(open);
    if (!open) {
      setCurrentRow(null);
    }
  };

  // 确认回调
  const handleConfirm = () => {
    if (currentRow?.id) {
      run(currentRow.id)
    }
  }
  return (
    <AlertDialog open={delDialogOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="size-5 text-destructive" />
            <AlertDialogTitle>{t('delete-confirm-title')}？</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{t('delete-confirm-description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>{t('cancel')}</Button>
          <Button
            type="submit"
            variant="destructive"
            disabled={loading}
            onClick={handleConfirm}>
            {loading ? <Spinner variant='circle' /> : null}
            {t('delete-confirm-title')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default DeleteAlertDialog;