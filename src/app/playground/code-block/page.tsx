/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-30 10:04:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-30 14:03:18
 * @Description: 代码块
 */
import { readFileSync } from 'fs';
import { basename, join } from 'path';
import { type FC } from 'react';

import CodeClient from './CodeClient'

import { CodeTabs } from '@/components/animate-ui/components/animate/code-tabs';
import { Card, CardContent, CardHeader, CardHeading, CardTitle } from '@/components/ui'

const CodeBlockPage: FC = () => {
  // 1. 构建时读取真实文件路径
  const filePath = join(process.cwd(), 'src', 'components', 'animate-ui', 'components', 'animate', 'code.tsx');
  const code = readFileSync(filePath, 'utf-8');
  const fileName = basename(filePath);
  const lang = fileName.split('.').pop() || "text"; // → "tsx"

  // 2. ✅ 读取 messages 并只提取 Route 部分
  const getRouteJson = (filePath: string) => {
    try {
      const fullContent = JSON.parse(readFileSync(filePath, 'utf-8'));
      // 只取 Route 对象
      const routeOnly = fullContent.Route;
      // 格式化为带缩进的 JSON 字符串
      return JSON.stringify(routeOnly, null, 2);
    } catch (error) {
      console.error(`Failed to parse ${filePath}`, error);
      return '{\n  "Route": {}\n}';
    }
  };

  const messagesDir = join(process.cwd(), 'messages');
  const enRouteJson = getRouteJson(join(messagesDir, 'en.json'));
  const zhRouteJson = getRouteJson(join(messagesDir, 'zh.json'));

  // 3. 构造 CODES 对象（用于 CodeTabs）
  const CODES = {
    '中文 (zh.json)': zhRouteJson,
    'English (en.json)': enRouteJson,
  };
  return (
    <div className="flex flex-col gap-4 min-w-0">
      <Card>
        <CardHeader>
          <CardHeading>
            <CardTitle>Code</CardTitle>
          </CardHeading>
        </CardHeader>
        <CardContent>
          <CodeClient code={code} fileName={fileName} lang={lang} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardHeading>
            <CardTitle>Code Tabs</CardTitle>
          </CardHeading>
        </CardHeader>
        <CardContent>
          <CodeTabs lang="json" codes={CODES} />
        </CardContent>
      </Card>
    </div>
  )
}
export default CodeBlockPage;