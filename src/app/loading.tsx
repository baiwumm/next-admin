/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:31:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-09 09:35:12
 * @Description: 全局 Loading
 */

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-60">
      <svg className="animate-spin h-10 w-10 mr-3" viewBox="0 0 24 24" />
    </div>
  );
}
