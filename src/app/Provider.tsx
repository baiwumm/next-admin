/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:53:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 09:54:59
 * @Description: 上下文提供者
 */
import { CustomProvider } from 'rsuite';

type ProvidersProps = {
  children: React.ReactNode;
};
export function Providers({ children }: ProvidersProps) {
  return (
    <CustomProvider>{children}</CustomProvider>
  );
}