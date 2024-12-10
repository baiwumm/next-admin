/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-10 10:47:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-10 10:47:38
 * @Description: 国际化
 */
import { useTranslations } from 'next-intl';
export default function Internationalization() {
  const t = useTranslations('Route');
  return (
    <div className="flex justify-center items-center font-black text-4xl" style={{ height: 'calc(100vh - 96px)' }}>
      {t('internationalization')}
    </div>
  );
}
