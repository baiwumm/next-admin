/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-30 16:53:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-30 17:59:29
 * @Description: 关于
 */
import DependenciesCard from './components/DependenciesCard';

export default function About() {
  return (
    <div className="flex flex-col gap-4">
      {/* 生产依赖 */}
      <DependenciesCard fieldName="dependencies" />
      {/* 开发依赖 */}
      <DependenciesCard fieldName="devDependencies" />
    </div>
  )
}