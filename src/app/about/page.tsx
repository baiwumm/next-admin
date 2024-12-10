/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:59:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-10 09:28:46
 * @Description: 关于
 */
import { useTranslations } from 'next-intl';
export default function About() {
  const t = useTranslations('Route');
  return (
    <div className="flex justify-center items-center font-black text-4xl" style={{ height: 'calc(100vh - 96px)' }}>
      {t('about')}
    </div>
  );
}
