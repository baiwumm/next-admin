/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-30 16:53:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-30 18:12:59
 * @Description: 关于
 */
import DependenciesCard from './components/DependenciesCard';
import ProjectInfo from './components/ProjectInfo';

export default function About() {
  // 项目信息
  return (
    <div className="flex flex-col gap-4">
      {/* 项目信息 */}
      <ProjectInfo />
      {/* 生产依赖 */}
      <DependenciesCard fieldName="dependencies" />
      {/* 开发依赖 */}
      <DependenciesCard fieldName="devDependencies" />
    </div>
  )
}